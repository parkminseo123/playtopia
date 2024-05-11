
import { Schema, model } from "mongoose";


const QnaSchema = new Schema({
    no: Number,
    title: String,
    category: String,
    date: String
});


export default model("qnadatas", QnaSchema);