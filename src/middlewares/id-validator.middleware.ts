import { NextFunction, Request, Response } from "express";
import { UserDatabase } from "../database/user.database";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";

export class IdValidatorMiddleware {
  public static idValidator(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const database = new UserDatabase();
      const user = database.getOneId(id);

      if (!id) {
        return RequestError.fieldNotProvided(res, "Id");
      }

      if (!user) {
        return RequestError.notFound(res, "User");
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
