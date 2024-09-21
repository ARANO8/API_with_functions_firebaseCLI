const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");

const app = express();

admin.initializeApp({
  credential: admin.credential.cert("./permissions.json"),
  //   databaseURL: "https://bdbuzon21sept-default-rtdb.firebaseio.com"
});

app.get("/hello-world", (req, res) => {
  return res.status(200).json({ message: "Hello World!" });
});

app.use(require("./routes/letters.routes"));

exports.app = functions.https.onRequest(app);
