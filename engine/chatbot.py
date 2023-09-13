import nltk
import numpy as np
import pickle
import json
import random
import os
from keras.models import load_model
from nltk.stem import WordNetLemmatizer
from dotenv import load_dotenv

lemmatizer = WordNetLemmatizer()

# COMMON VARIABLES
load_dotenv()
intents_name = os.getenv("INTENT_FILE")
intents_path = os.getenv("INTENT_PATH")
intents_file = os.path.join(intents_path, intents_name)

model_name = os.getenv("MODEL_NAME")
model_path = os.getenv("MODEL_PATH")
model_file = os.path.join(model_path, model_name)

words_name = os.getenv("WORDS_FILE")
words_path = os.getenv("WORDS_PATH")
words_file = os.path.join(words_path, words_name)

classes_name = os.getenv("CLASSES_FILE")
classes_path = os.getenv("CLASSES_PATH")
classes_file = os.path.join(classes_path, classes_name)

# chat initialization
model = load_model(model_file)
intents = json.loads(open(intents_file).read())
data_file = open(intents_file).read()
words = pickle.load(open(words_file, "rb"))
classes = pickle.load(open(classes_file, "rb"))

# Chant Functionalities
def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words


# return bag of words array: 0 or 1 for each word in the bag that exists in the sentence
def bow(sentence, words, show_details=True):
    # tokenize the pattern
    sentence_words = clean_up_sentence(sentence)
    # bag of words - matrix of N words, vocabulary matrix
    bag = [0] * len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                # assign 1 if current word is in the vocabulary position
                bag[i] = 1
                if show_details:
                    print("found in bag: %s" % w)
    return np.array(bag)


def predict_class(sentence, model):
    # filter out predictions below a threshold
    p = bow(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    # sort by strength of probability
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list


def getResponse(ints, intents_json):
    tag = ints[0]["intent"]
    list_of_intents = intents_json["intents"]
    for i in list_of_intents:
        if i["tag"] == tag:
            result = random.choice(i["responses"])
            break
    return result

def chatbot_response(msg):
    ints = predict_class(msg, model)
    res = getResponse(ints, intents)
    return res