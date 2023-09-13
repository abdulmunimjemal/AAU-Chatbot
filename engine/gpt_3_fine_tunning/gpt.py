import os
from dotenv import load_dotenv
import openai
import json
import requests
import time

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

def send_chat_message(message, model="gpt-3.5-turbo"):
    endpoint = "https://api.openai.com/v1/engines/{}/completions".format(model)

    # Compose the data payload for the API request
    data = {
        "messages": [{"role": "system", "content": "You are a chatbot that provides information about Addis Ababa University. You can answer questions about the university and its history and facilities and grading systems. You can also answer questions about the history of Addis Ababa Institute of Technology. You do not go off-topic. You can speak Amharic, English and Afan oromoo. When the user asks for the latest information, you remind them to check the website or call for the latest real-time information."},
                     {"role": "user", "content": message}]
    }


    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    max_retries = 5
    retries = 0

    while retries < max_retries:
        try:
            response = requests.post(endpoint, headers=headers, data=json.dumps(data))

            if response.status_code == 200:
                result = response.json()
                return result['choices'][0]['message']['content']
            elif response.status_code == 429:
                retry_after = int(response.headers.get('Retry-After', 5))
                time.sleep(retry_after)
            else:
                print(f"Error: {response.status_code}")
                return None
        except Exception as e:
            print(f"An error occurred: {str(e)}")
        
        retries += 1

    print("Max retries reached. Could not get a successful response.")
    return None

# Test the chatbot
user_input = "Tell me about the admission process of Addis Ababa Institute of Technology."
response = send_chat_message(user_input)
print("Chatbot Response:", response)
