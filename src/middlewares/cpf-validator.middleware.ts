import { NextFunction, Request, Response } from "express";
import { UserDatabase } from "../database/user.database";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";

export class CpfValidatorMiddleware {
  public static cpfValidator(req: Request, res: Response, next: NextFunction) {
    try {
      const { cpf } = req.body;
      const database = new UserDatabase();
      const existingCpf = database.getOneCpf(cpf);

      if (existingCpf) {
        return RequestError.alreadyExisting(
          res,
          "There is already a use with this CPF"
        );
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
