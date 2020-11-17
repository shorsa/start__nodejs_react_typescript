//Helpers
import { AppError } from "../../helpers/appErrorHandler.helper";
//Models
import { RequestExampleModel } from "./models";
import { BaseResponseModel } from "../shared/models";
//Repositories
import * as authRepository from "./example.repository";
//Schemas
import { ExampleSchema } from "./schemas/ExampleRequest.schema";

export async function exampleCreate(request: RequestExampleModel) {
    const validation: boolean = await ExampleSchema.isValid(request);

    if (!validation) {
        return new AppError(400, "test model is not valid!");
    }
    const response: BaseResponseModel = await authRepository.create(request.test)

    return response;
}

