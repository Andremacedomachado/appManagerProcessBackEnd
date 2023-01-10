import { Request, Response, Router } from 'express';
import { createUserController } from './application/usecases/createUser';
import { sessionLoginController } from './application/usecases/sessionLogin';
import { createRoleController } from './application/usecases/createRole';

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

//routes role

routes.post('/roles', (req: Request, res: Response) => {
    return createRoleController.handle(req, res);
});

export { routes };