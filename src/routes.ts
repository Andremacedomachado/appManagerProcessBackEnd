import { Request, Response, Router } from 'express';
import { createUserController } from './application/usecases/createUser';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    res.json({
        'message': 'Hello word!!'
    })
})

routes.post('/users', (req: Request, res: Response) => {
    return createUserController.handle(req, res);
});

export { routes };