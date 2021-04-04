const express = require("express");

const app = express();

// middleware para o express receber o JSON
app.use(express.json());


app.listen(3333, console.log("http://localhost:3333"));
