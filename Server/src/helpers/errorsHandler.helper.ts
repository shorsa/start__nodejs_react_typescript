import httpStatus from "http-status";

const notFound = (req: any, res: any, next: any) => {
    res.status(httpStatus.NOT_FOUND);
    res.json({
        success: false,
        
        message: "Requested Resource Not Found"
    });
    res.end();
};

const errorServerHandler = (err: any, req: any, res: any, next: any) => {
    res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);
    res.json({
        message: err.message,
        extra: err.extra,
        errors: err
    });
    res.end();
}

export default {
    notFound,
    errorServerHandler
}