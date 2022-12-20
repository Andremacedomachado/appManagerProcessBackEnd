import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    res.json({
        'message': 'Hello word!!'
    })
})


export { routes };