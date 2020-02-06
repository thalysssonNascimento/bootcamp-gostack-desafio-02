import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({
        message: 'Etapa 1/4 do Desafio Final / Desafio 2: FastFeet, o início',
    });
});

routes.post('/users', UserController.store);

export default routes;
