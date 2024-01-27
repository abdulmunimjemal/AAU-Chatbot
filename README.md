# AAU Chatbot

AAU Chatbot (Abebech) is a chatbot application powered by natural language processing and machine learning. It provides a simple and intuitive interface for users to interact with a chatbot that can understand and respond to their queries.

## Overview

This project consists of two main components:

1. **Chatbot Engine (engine/):** This part of the project contains the backend logic responsible for understanding user messages and generating appropriate responses. It uses machine learning models and natural language processing techniques to achieve this.

2. **Web Interface (web/):** The web interface provides users with a platform to interact with the chatbot. It includes the frontend components built with HTML, CSS, and JavaScript.

## Getting Started

Follow these steps to get the project up and running on your local machine:

### Prerequisites

Before you begin, ensure you have the following dependencies installed:

- [TensorFlow](https://www.tensorflow.org/): You can install TensorFlow using pip with the following command:
  ```
  pip install tensorflow
  ```

- [NLTK (Natural Language Toolkit)](https://www.nltk.org/): NLTK is used for natural language processing tasks. You can install it with:
  ```
  pip install nltk
  ```

- [Flask-RESTful](https://flask-restful.readthedocs.io/en/latest/): Flask-RESTful is used to create the API. Install it with:
  ```
  pip install flask-restful
  ```

- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/): Flask-CORS is used for enabling cross-origin resource sharing. Install it with:
  ```
  pip install flask-cors
  ```

- [OpenAI Python](https://github.com/openai/openai-python): OpenAI Python is used to communicate with the GPT-3 model. You can install it with:
  ```
  pip install openai
  ```

- [python-dotenv](https://github.com/theskumar/python-dotenv): The `python-dotenv` library is used for managing environment variables. Install it with:
  ```
  pip install dotenv
  ```

### Project Structure

The project is structured as follows:

- **engine/**: Contains the backend logic for the chatbot engine.
  - **data/**: Intents and other data files are stored here.
  - **models/**: Saved models, class and word pickle files are stored here.
  - **server.py**: Flask RESTful API for the chatbot.
  - **chatbot.py**: Response generation for the API.
  - **train.ipynb**: Jupyter Notebook for training and saving the model (optional).

- **web/**: Contains the web interface for user interaction.
  - HTML, CSS, JS, and other frontend files are located here.

## Usage

To use the AAU Chatbot, follow these steps:

1. Install the required dependencies as mentioned in the Prerequisites section.

2. Start the Flask server for the chatbot engine:
   ```
   cd engine
   python server.py
   ```

3. Open the web interface by accessing the HTML files in the `web/` directory using a web browser.

4. Interact with the chatbot by typing your queries and receiving responses.

## Contributing

Contributions to this project are welcome. If you have any ideas or improvements to suggest, please open an issue or create a pull request.


## Acknowledgments

- Special thanks to the open-source community :D

## Screenshots

![GIF](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTFpN2V4d25mMGNudDRvaDVtYjBrbG43bDNwZTF6N2J1MWppd3dqdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QzZ1sdJMT5qNsmVQpw/giphy.gif)
