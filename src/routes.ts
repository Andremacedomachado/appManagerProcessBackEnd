import { Request, Response, Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

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
import { createCollaboratorController } from './application/usecases/createCollaborator';
import { getCollaboratorByActivityIdController } from './application/usecases/getCollaboratorByActivity';
import { getCollaboratorByUserController } from './application/usecases/getCollaboratorByUser';
import { getRootNodeActivityTreeController } from './application/usecases/getRootNodeActivityTree';
import { getALLActivityTreeByUserController } from './application/usecases/getAllActivityTreeByUser';
import { changeActivityTreeProcessStatusController } from './application/usecases/changeActivityTreeProcessStatus';
import { createMessageActivityController } from './application/usecases/createMessageActivity';
import { getMessageByActivityIdController } from './application/usecases/getMessageByActivityId/Index';
import { getAllMessageActivityController } from './application/usecases/getAllMessageActivity/Index';
import { getMessageByUserIdController } from './application/usecases/getMessageByUserId/Index';
import { updateMessageActivityController } from './application/usecases/updateMessageActivity';
import { createAnnexActivityController } from './application/usecases/createAnnexActivity';
import { getAnnexActivityInfoUController } from './application/usecases/getAnnexActivityInfo';
import { getAnnexFilecontroller } from './application/usecases/getAnnexFile';
import { deleteAnnexActivityController } from './application/usecases/deleteAnnexActivity';

const routes = Router();

const upload = multer(multerConfig);

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

routes.get('/activityRootNode', isAuthenticated(), (req: Request, res: Response) => {
    return getRootNodeActivityTreeController.handle(req, res);
})

routes.get('/collectionActivityTree', isAuthenticated(), (req: Request, res: Response) => {
    return getALLActivityTreeByUserController.handle(req, res);
})

routes.post('/changeActivityTreeProcessStatus', isAuthenticated(), (req: Request, res: Response) => {
    return changeActivityTreeProcessStatusController.handle(req, res);
})

//routes Collaborators

routes.post('/collaborators', isAuthenticated(), (req: Request, res: Response) => {
    return createCollaboratorController.handle(req, res);
});

routes.get('/collaboratorsByActivity', isAuthenticated(), (req: Request, res: Response) => {
    return getCollaboratorByActivityIdController.handle(req, res);
});

routes.get('/collaboratorsByUser', isAuthenticated(), (req: Request, res: Response) => {
    return getCollaboratorByUserController.handle(req, res);
})

//routes Message Activity

routes.post('/messageActivity', isAuthenticated(), (req: Request, res: Response) => {
    return createMessageActivityController.handle(req, res);
});

routes.get('/messageActivity/activityId', isAuthenticated(), (req: Request, res: Response) => {
    return getMessageByActivityIdController.handle(req, res);
});

routes.get('/messageActivity', isAuthenticated(), (req: Request, res: Response) => {
    return getAllMessageActivityController.handle(req, res);
});

routes.get('/messageActivity/userId', isAuthenticated(), (req: Request, res: Response) => {
    return getMessageByUserIdController.handle(req, res);
});

routes.put('/messageActivity', isAuthenticated(), (req: Request, res: Response) => {
    return updateMessageActivityController.handle(req, res);
});

//routes Annex Activity

routes.post('/uploads', isAuthenticated(), upload.single('file'), (req: Request, res: Response) => {
    return createAnnexActivityController.handle(req, res)
})

routes.get('/annexActivity', isAuthenticated(), (req: Request, res: Response) => {
    return getAnnexActivityInfoUController.handle(req, res)
})

routes.get('/annexActivity/file', isAuthenticated(), (req: Request, res: Response) => {
    return getAnnexFilecontroller.handle(req, res)
})

routes.delete('/annexActivity', isAuthenticated(), (req: Request, res: Response) => {
    return deleteAnnexActivityController.handle(req, res)
})