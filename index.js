const core = require("./utils/core");

const express = require('express');
const bodyParser = require('body-parser');

const rootPage = require("./pages/root")(core);
const claimPage = require("./pages/claim")(core);

const server = express();

server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());

server.use("/", rootPage);
server.use("/claim", claimPage);

server.listen(8080);
console.log("Ready");
