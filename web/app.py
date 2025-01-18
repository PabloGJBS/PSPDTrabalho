from flask import Flask, request, jsonify
import grpc
import dictionary_pb2
import dictionary_pb2_grpc

app = Flask(__name__)

def grpc_request(word):
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = dictionary_pb2_grpc.DictionaryStub(channel)
        grpc_request = dictionary_pb2.WordRequest(word=word)
        return stub.ProcessWord(grpc_request)

@app.route('/add', methods=['POST'])
def add_word():
    word = request.json.get('word')
    grpc_request(word)
    return jsonify({"message": f"Word '{word}' added successfully."})

@app.route('/dictionary', methods=['GET'])
def get_dictionary():
    response = grpc_request("IMPRIMIR")
    return jsonify([
        {"word": entry.word, "count": entry.count}
        for entry in response.dictionary
    ])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
