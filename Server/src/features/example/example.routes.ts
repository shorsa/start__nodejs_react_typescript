//Vendors
import { Router } from "express";
//Constants
import { ApiEndpointsConstants } from "../../config/api-endpoints.constants";
//Controllers
import * as ExampleController from "./example.controller";

export const authenticationRouter: Router = Router();

authenticationRouter.post(ApiEndpointsConstants.TEST, ExampleController.exampleHandler);