
import { Schema, model } from "mongoose";


const QnaExplainShema = new Schema({
    no: Number,
    title: String,
    content: String,
    name : String
});


export default model("QnaExplainDatas", QnaExplainShema);