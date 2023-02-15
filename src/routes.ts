import { Request, Response, Router } from 'express';
import { createUserController } from './application/usecases/createUser';
import { sessionLoginController } from './application/usecases/sessionLogin';
import { createRoleController } from './application/usecases/createRole';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { isAllowed } from './middlewares/isAllowed';
import { createRecordRoleController } from './application/usecases/createRecordRole';
import { getUserByIdController } from './application/usecases/getUserById';
import { getAllUsersController } from './application/usecases/getAllUsers';
import { createOrganizationController } from './application/usecases/createOrganization';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    res.json({
        'message': 'Hello word!!'
    })
})

//rotes user
routes.get('/users', isAuthenticated(), isAllowed(['Funcionario']), (req: Request, res: Response) => {
    return getAllUsersController.handle(req, res);
});

routes.get('/user', isAuthenticated(), (req: Request, res: Response) => {
    return getUserByIdController.handle(req, res);
});

routes.post('/users', isAuthenticated(), isAllowed(['Funcionario']), (req: Request, res: Response) => {
    return createUserController.handle(req, res);
});

routes.post('/user/roles', isAuthenticated(), (req: Request, res: Response) => {
    return createRecordRoleController.handle(req, res);
});

//routes login

routes.post('/login', (req: Request, res: Response) => {
    return sessionLoginController.handle(req, res);
});

//routes role

routes.post('/roles', isAuthenticated(), (req: Request, res: Response) => {
    return createRoleController.handle(req, res);
});

export { routes };

//routes Organization

routes.post('/organizations', isAuthenticated(), (req: Request, res: Response) => {
    return createOrganizationController.handle(req, res);
});