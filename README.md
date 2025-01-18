# Microserviço de Dicionário

## Descrição

Este projeto é um microserviço de dicionário que utiliza gRPC para processar palavras e manter um dicionário com a contagem de cada palavra recebida. O microserviço é composto por um servidor gRPC, um cliente gRPC e uma interface web para interação com o dicionário.

## Estrutura do Projeto

```
client/
    client.js
proto/
    dictionary.proto
server/
    server.js
web/
    web-server.js
index.html
```

### Arquivos e Pastas

- **.gitignore**: Arquivo para ignorar diretórios e arquivos específicos no controle de versão.
- **client/**: Contém o cliente gRPC que envia palavras para o servidor.
  - **client.js**: Implementação do cliente gRPC.
- **index.html**: Interface web para interação com o dicionário.
- **package.json**: Arquivo de configuração do npm com as dependências do projeto.
- **proto/**: Contém o arquivo de definição do protocolo gRPC.
  - **dictionary.proto**: Definição do serviço gRPC e das mensagens.
- **server/**: Contém o servidor gRPC que processa as palavras.
  - **server.js**: Implementação do servidor gRPC.
- **web/**: Contém o servidor web que expõe endpoints REST para interação com o cliente web.
  - **web-server.js**: Implementação do servidor web.

## Funcionalidades

### Servidor gRPC

O servidor gRPC é implementado em `server.js` e expõe o serviço `Dictionary` definido em `dictionary.proto`. Ele processa palavras recebidas e mantém um dicionário com a contagem de cada palavra. 

### Cliente gRPC

O cliente gRPC é implementado em `client.js` e se comunica com o servidor gRPC para enviar palavras e imprimir o dicionário.

### Interface Web

A interface web é implementada em `index.html` e permite que os usuários enviem palavras e visualizem o dicionário atualizado. A interface se comunica com o servidor web, que por sua vez se comunica com o servidor gRPC.

### Servidor Web

O servidor web é implementado em `web-server.js`  e expõe endpoints REST para processar palavras e imprimir o dicionário. Ele se comunica com o servidor gRPC para realizar essas operações.

## Como Executar

1. Instale as dependências do projeto:
   ```sh
   npm install
   ```

2. Inicie o servidor gRPC:
   ```sh
   node server/server.js
   ```

3. Inicie o servidor web:
   ```sh
   node web/web-server.js
   ```

4. Abra o arquivo `index.html` em um navegador para acessar a interface web.

## Exemplo de Uso

1. Digite uma palavra no campo de entrada e clique em "Enviar Palavra".
2. Clique em "Imprimir Dicionário" para visualizar o dicionário atualizado com a contagem de cada palavra.

## Dependências

- `@grpc/grpc-js`: Biblioteca gRPC para Node.js.
- `cors`: Middleware para habilitar CORS no servidor web.
- `express`: Framework web para Node.js.

## Definição do Protocolo gRPC

O arquivo `dictionary.proto` define o serviço gRPC `Dictionary` e as mensagens `WordRequest`, `WordResponse` e `WordEntry`.

```proto
syntax = "proto3";

service Dictionary {
  rpc ProcessWord (WordRequest) returns (WordResponse);
}

message WordRequest {
  string word = 1;
}

message WordResponse {
  repeated WordEntry dictionary = 1;
}

message WordEntry {
  string word = 1;
  int32 count = 2;
}
```

## Conclusão

Este projeto demonstra como criar um microserviço de dicionário utilizando gRPC e Node.js, com uma interface web para interação com o serviço.