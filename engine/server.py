from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_cors import CORS
import chatbot

print("Starting server...")

app = Flask(__name__)
CORS(app)
api = Api(app)


class AnswerChat(Resource):
    def get(self):
        return jsonify({'message': 'You are using the wrong method. Use POST instead.'})
    def post(self):
        data = request.get_json()
        msg = data['message']
        answer = chatbot.chatbot_response(msg)
        return jsonify({'message': answer})

api.add_resource(AnswerChat, '/api/v1.0/chatbot')

if __name__ == '__main__':
    app.run(debug=True)