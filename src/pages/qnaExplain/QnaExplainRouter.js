import express from 'express';
import { list, post } from './QnaExplainController.js';

const QnaExplainRouter = express.Router();

QnaExplainRouter.post ('/post/', post);
QnaExplainRouter.get ('/list/', list);


export default QnaExplainRouter;
