import {
    Router
} from 'express';
import {
    CreateTinyURL,
    GetTinyURL
} from '../controllers/TinyURLController';
const TinyURLRouter = new Router();

TinyURLRouter.get('/get-url/:code', GetTinyURL);

TinyURLRouter.post('/create-url', CreateTinyURL);

export default TinyURLRouter;