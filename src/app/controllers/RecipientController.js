import * as Yup from 'yup';
import User from '../models/User';

import Recipient from '../models/Recipient';

class RecipientController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.number().required(),
            complement: Yup.string().required(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            zip_code: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Erro na validação de dados' });
        }

        const user = await User.findByPk(req.userId);

        if (user.provider !== 'admin') {
            return res
                .status(401)
                .json({ error: 'O usuário não é administrador' });
        }

        const {
            name,
            street,
            number,
            complement,
            state,
            city,
            zip_code,
        } = req.body;

        await Recipient.create({
            name,
            street,
            number,
            complement,
            state,
            city,
            zip_code,
            user_id: req.userId,
        });

        return res.json({
            name,
            street,
            number,
            complement,
            state,
            city,
            zip_code,
            user_id: req.userId,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.number().required(),
            complement: Yup.string().required(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            zip_code: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Erro na validação de dados' });
        }

        const idRecipient = req.params.id;

        const {
            name,
            street,
            number,
            complement,
            state,
            city,
            zip_code,
        } = req.body;

        const recipient = Recipient.findByPk(idRecipient);

        if (!recipient) {
            return res
                .status(404)
                .json({ error: 'Destinatário não encontrado' });
        }

        if (recipient.user_id !== req.userId) {
            return res
                .status(404)
                .json({ error: 'Destinatário não encontrado' });
        }

        await Recipient.update({
            name,
            street,
            number,
            complement,
            state,
            city,
            zip_code,
            user_id: req.userId,
        });

        return res.json({
            name,
            street,
            number,
            complement,
            state,
            city,
            zip_code,
            user_id: req.userId,
        });
    }
}

export default new RecipientController();
