import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({ message: 'Etapa 1/4 do Desafio Final / Desafio 2: FastFeet, o início' });
});

export default routes;