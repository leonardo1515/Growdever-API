import { NextFunction, Request, Response } from "express";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";

export class CreateValidatorMiddleware {
  public static createValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, age, cpf, email } = req.body;

      if (!name) {
        return RequestError.notFound(res, "Name");
      }
      if (!cpf) {
        return RequestError.notFound(res, "Cpf");
      }
      if (!email) {
        return RequestError.notFound(res, "Email");
      }
      if (!age) {
        return RequestError.notFound(res, "Age");
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
