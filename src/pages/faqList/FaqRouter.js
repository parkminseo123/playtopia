import express from 'express';
import { list, post } from './FaqController.js';

const FaqRouter = express.Router();

FaqRouter.get ('/post/', post);
FaqRouter.get ('/list/', list);



export default FaqRouter;
