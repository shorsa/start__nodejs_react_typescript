//Vendors
import * as bodyParser from 'body-parser';
import cors from "cors";
import express from "express";
import helmet from 'helmet';
import morgan from 'morgan';
//Constants
import { ApiEndpointsConstants } from './config/api-endpoints.constants';
import "./config/db";
//Routes
import { authenticationRouter } from "./features/example/example.routes";
//Helpers
import ErrorsHandler from './helpers/errorsHandler.helper';

class App {
    public express: express.Application;
    constructor() {
        this.express = express();
        this.setMiddleware();
        this.setRoutes();
        this.catchErrors();
    }

    private setMiddleware(): void {
        this.express.use(cors());
        this.express.use(morgan("dev"));
        this.express.use(bodyParser.json({ limit: '10mb' }));
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(helmet());
    }

    private setRoutes(): void {
        const getUrl = (route: string): string => ApiEndpointsConstants.API + route;

        this.express.use(getUrl(ApiEndpointsConstants.EXAMPLE_FEATURE), authenticationRouter)
    }

    private catchErrors(): void {
        this.express.use(ErrorsHandler.notFound);
        this.express.use(ErrorsHandler.errorServerHandler);
    }
}

export default new App().express;