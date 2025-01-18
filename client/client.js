const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '..', 'proto', 'dictionary.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).Dictionary;

const client = new proto('localhost:50051', grpc.credentials.createInsecure());

function imprimirDicionario() {
  client.ProcessWord({ word: 'IMPRIMIR' }, (error, response) => {
    if (!error) {
      console.log('Dicionário Atualizado:');
      response.dictionary.forEach(entry => {
        console.log(`Palavra: ${entry.word}, Contagem: ${entry.count}`);
      });
    } else {
      console.error(error);
    }
  });
}

function processarPalavra(word) {
  client.ProcessWord({ word }, (error, response) => {
    if (!error) {
      console.log(`Palavra processada: ${word}`);
      if (word === 'IMPRIMIR') {
        imprimirDicionario();
      }
    } else {
      console.error(error);
    }
  });
}

processarPalavra('casa');
processarPalavra('carro');
processarPalavra('casa');
processarPalavra('IMPRIMIR');
