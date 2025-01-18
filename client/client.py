import grpc
import dictionary_pb2
import dictionary_pb2_grpc

def run():
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = dictionary_pb2_grpc.DictionaryStub(channel)

        # Enviar palavras para o servidor
        words = ["hello", "world", "hello", "IMPRIMIR"]
        for word in words:
            request = dictionary_pb2.WordRequest(word=word)
            response = stub.ProcessWord(request)

            if word == "IMPRIMIR":
                print("Dicionário:")
                for entry in response.dictionary:
                    print(f"{entry.word}: {entry.count}")

if __name__ == "__main__":
    run()
