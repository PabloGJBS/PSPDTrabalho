const express = require('express');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '..', 'proto', 'dictionary.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).Dictionary;

const client = new proto('localhost:50052', grpc.credentials.createInsecure());

const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.post('/processar', (req, res) => {
  const { word } = req.body;

  client.ProcessWord({ word }, (error, response) => {
    if (error) {
      console.error('Erro ao processar palavra:', error);
      return res.status(500).json({ error: 'Erro no microserviço gRPC' });
    }

    res.json(response);
  });
});

app.get('/imprimir', (req, res) => {
  client.ProcessWord({ word: 'IMPRIMIR' }, (error, response) => {
    if (error) {
      console.error('Erro ao imprimir dicionário:', error);
      return res.status(500).json({ error: 'Erro no microserviço gRPC' });
    }

    res.json(response);
  });
});

const PORT = 9500;
app.listen(PORT, () => {
  console.log(`Servidor web rodando na porta ${PORT}`);
});
