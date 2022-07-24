import {
    Router
} from 'express';
import {
    CreateTinyURL
} from '../controllers/TinyURLController';
const TinyURLRouter = new Router();

// TinyURLRouter.get('/get-url');

TinyURLRouter.post('/create-url', CreateTinyURL);

export default TinyURLRouter;