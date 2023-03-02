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
import { getOrganizationByIdController } from './application/usecases/getOrganizationById';
import { getAllOrganizationController } from './application/usecases/getAllOrganization';
import { createOrganizationSectorController } from './application/usecases/createOrganizationSector';
import { getAllOrganizationSectorController } from './application/usecases/getAllOrganizationSector';
import { getOrganizationSectorByIdController } from './application/usecases/getOganizationSectorById';
import { changeWorkerStatusController } from './application/usecases/changeWorkerStatus';
import { createActivityController } from './application/usecases/createActivity';
import { getActivityController } from './application/usecases/getActivity';
import { getAllActivityController } from './application/usecases/getAllActivity';
import { getDescendantActivityTreeController } from './application/usecases/getDescendantActivitytree';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    res.json({
        'message': 'Hello word!!'
    })
})

//rotes user
routes.get('/users', isAuthenticated(), (req: Request, res: Response) => {
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

routes.post('/user', isAuthenticated(), (req: Request, res: Response) => {
    return changeWorkerStatusController.handle(req, res);
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

routes.get('/organization', isAuthenticated(), (req: Request, res: Response) => {
    return getOrganizationByIdController.handle(req, res);
});

routes.get('/organizations', isAuthenticated(), (req: Request, res: Response) => {
    return getAllOrganizationController.handle(req, res);
});

//routes Sectors

routes.post('/sectors', isAuthenticated(), (req: Request, res: Response) => {
    return createOrganizationSectorController.handle(req, res);
});

routes.get('/sectors', isAuthenticated(), (req: Request, res: Response) => {
    return getAllOrganizationSectorController.handle(req, res);
});

routes.get('/sector', isAuthenticated(), (req: Request, res: Response) => {
    return getOrganizationSectorByIdController.handle(req, res);
});

//routes Activities

routes.post('/activities', isAuthenticated(), (req: Request, res: Response) => {
    return createActivityController.handle(req, res);
});

routes.get('/activities', isAuthenticated(), (req: Request, res: Response) => {
    return getAllActivityController.handle(req, res);
})

routes.get('/activity', isAuthenticated(), (req: Request, res: Response) => {
    return getActivityController.handle(req, res);
})

routes.get('/activityTree', isAuthenticated(), (req: Request, res: Response) => {
    return getDescendantActivityTreeController.handle(req, res);
})