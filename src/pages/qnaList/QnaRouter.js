import express from 'express';
import { list, post } from './QnaController.js';


const QnaRouter = express.Router();

QnaRouter.post ('/post/', post);
QnaRouter.get ('/list/', list);



export default QnaRouter;

