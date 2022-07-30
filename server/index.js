const express = require("express");
require("dotenv").config();
const cors = require('cors');
const router = require('./routes');

// create an instance of express app
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

async function main() {
  
  app.use(router);

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log("Server started listening on port: ", port);
  });
}

main();
