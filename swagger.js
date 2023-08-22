const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./back-end/swagger_output.json";
const endpointsFiles = ["./back-end/connect.js"];
const doc = {
  info: {
    title: "API Nu3tion",
    description: "This is the API for nu3tion app",
    version: "1.0.0",
  },
  host: "127.0.0.1:8001", // Specify the desired host here
};
swaggerAutogen(outputFile, endpointsFiles, doc);
