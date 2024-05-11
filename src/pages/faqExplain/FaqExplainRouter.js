import express from 'express';
import { list } from './FaqExplainController.js';

const FaqExplainRouter = express.Router();


FaqExplainRouter.get ('/list/', list);


export default FaqExplainRouter;
