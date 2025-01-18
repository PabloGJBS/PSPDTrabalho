const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '..', 'proto', 'dictionary.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).Dictionary;

let dictionary = {};

function processWord(call, callback) {
  const wordReceived = call.request.word;

  if (wordReceived === 'IMPRIMIR') {
    const dictionaryEntries = Object.entries(dictionary).map(([word, count]) => {
      return { word, count };
    });
    callback(null, { dictionary: dictionaryEntries });
  } else {
    if (wordReceived !== 'IMPRIMIR') {
      if (dictionary[wordReceived]) {
        dictionary[wordReceived] += 1;
      } else {
        dictionary[wordReceived] = 1;
      }
    }
    callback(null, { dictionary: Object.entries(dictionary).map(([word, count]) => ({ word, count })) });
  }
}

const server = new grpc.Server();
server.addService(proto.service, { ProcessWord: processWord });

const PORT = '50052';
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    console.error(`Erro ao vincular o servidor: ${error.message}`);
    return;
  }
  console.log(`Servidor gRPC rodando na porta ${port}`);
});