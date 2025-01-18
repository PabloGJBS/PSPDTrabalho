#include <iostream>
#include <string>
#include <unordered_map>
#include <grpcpp/grpcpp.h>
#include "dictionary.grpc.pb.h"

using grpc::Server;
using grpc::ServerBuilder;
using grpc::ServerContext;
using grpc::Status;
using dictionary::Dictionary;
using dictionary::WordRequest;
using dictionary::WordResponse;
using dictionary::WordEntry;

class DictionaryServiceImpl final : public Dictionary::Service {
private:
    std::unordered_map<std::string, int> dictionary;

public:
    Status ProcessWord(ServerContext* context, const WordRequest* request, WordResponse* response) override {
        std::string word = request->word();
        
        if (word == "IMPRIMIR") {
            for (const auto& entry : dictionary) {
                WordEntry* word_entry = response->add_dictionary();
                word_entry->set_word(entry.first);
                word_entry->set_count(entry.second);
            }
        } else {
            dictionary[word]++;
        }

        return Status::OK;
    }
};

void RunServer() {
    std::string server_address("0.0.0.0:50051");
    DictionaryServiceImpl service;

    ServerBuilder builder;
    builder.AddListeningPort(server_address, grpc::InsecureServerCredentials());
    builder.RegisterService(&service);

    std::unique_ptr<Server> server(builder.BuildAndStart());
    std::cout << "Server listening on " << server_address << std::endl;
    server->Wait();
}

int main(int argc, char** argv) {
    RunServer();
    return 0;
}
