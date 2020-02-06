import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({
        message: 'Etapa 1/4 do Desafio Final / Desafio 2: FastFeet, o início',
    });
});

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
