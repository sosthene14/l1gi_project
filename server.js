require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const listenPort = 5002 || 3000;
const mongoUrl = process.env.MONGO_URL;

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connecté");
  })
  .catch((e) => console.log(e));

require("./schema_mongo");
const files = mongoose.model(process.env.DB_NAME);

app.get("/updateLikes/:id/:increment", async (req, res) => {
  try {
    const id = req.params.id;
    const increment = parseInt(req.params.increment);

    // Mettre à jour le document avec l'ID "id" et incrémenter le champ "nombre_de_likes"
    const result = await files.findByIdAndUpdate(
      id,
      { $set: { nombre_de_likes: increment } },
      { new: true }
    );

    res.send({ status: "ok", data: result });
  } catch (error) {
    console.error(error);
    res.send({ status: "mystique" }); 
  }
});

app.get("/get", async (req, res) => {
    try {
      await files.find({}).then((data) => {
        res.send({ data: data });
      });
    } catch (error) {
      res.send({ status: "erreur" });
    }
  });


app.listen(listenPort, () => {
  console.log("server started port "+listenPort);
});

