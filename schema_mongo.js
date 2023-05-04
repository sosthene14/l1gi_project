const mongoose = require("mongoose");

const Schema = mongoose.Schema({
        alt: String,
        lien_de_telechargement: String,
        lien_image: String,
        nombre_de_likes: Number,
        titre: String,
        date_de_publication : Date
});
const model = mongoose.model(process.env.DB_NAME,Schema,process.env.CLUSTER);
module.exports = model;
