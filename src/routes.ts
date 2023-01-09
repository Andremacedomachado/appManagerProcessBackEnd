import { Request, Response, Router } from 'express';
import { createUserController } from './application/usecases/createUser';
import { sessionLoginController } from './application/usecases/sessionLogin';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    res.json({
        'message': 'Hello word!!'
    })
})

//rotes user
routes.post('/users', (req: Request, res: Response) => {
    return createUserController.handle(req, res);
});

//routes login

routes.post('/login', (req: Request, res: Response) => {
    return sessionLoginController.handle(req, res);
});

export { routes };