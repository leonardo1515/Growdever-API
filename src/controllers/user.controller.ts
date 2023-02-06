import { Request, Response } from "express";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";
import { SuccessResponse } from "../util/success.response";
import { UserDatabase } from "../database/user.database";
import { User } from "../models/user.models";

export class UserController {
  public getFilter(req: Request, res: Response) {
    try {
      const { name, email, cpf } = req.query;
      const database = new UserDatabase();
      const allUsers = database.list();

      if (allUsers.length < 1) {
        return res.status(404).send({
          ok: false,
          message: "User list is empty",
          data: allUsers,
        });
      }

      const result = allUsers.map((user) => user.toJson());

      if (name) {
        const users = database.getFilterName(String(name));
        const result = users.map((user) => user.toJson());
        if (users.length < 1) {
          return RequestError.notFound(res, "User");
        }

        return SuccessResponse.ok(
          res,
          "List of users successfully obtained",
          result
        );

        // res.status(200).send({
        //   ok: true,
        //   message: "List of users successfully obtained",
        //   data: users,
        // });
      }

      if (email) {
        const users = database.getFilterEmail(String(email));
        const result = users.map((user) => user.toJson());

        if (users.length < 1) {
          return RequestError.notFound(res, "User");
        }

        return SuccessResponse.ok(
          res,
          "List of users successfully obtained",
          result
        );
      }

      if (cpf) {
        const users = database.getFilterCpf(String(cpf));
        const result = users.map((user) => user.toJson());

        if (users.length < 1) {
          return RequestError.notFound(res, "User");
        }
        return SuccessResponse.ok(
          res,
          "List of users successfully obtained",
          result
        );
      }

      return SuccessResponse.ok(
        res,
        "List of users successfully obtained",
        result
      );
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const database = new UserDatabase();
      const user = database.getOneId(id);

      const result = {
        name: user?.name,
        age: user?.age,
        email: user?.email,
        cpf: user?.cpf,
      };

      return SuccessResponse.ok(res, "User successfull obtianed", result);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { email, age } = req.body;
      const database = new UserDatabase();
      const user = database.getOneId(id);

      if (email) {
        user!.email = email;
      }

      if (age) {
        user!.age = age;
      }

      const result = {
        name: user?.name,
        age: user?.age,
        email: user?.email,
        cpf: user?.cpf,
      };

      return SuccessResponse.created(res, "User successfully updated", result);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public delet(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const database = new UserDatabase();
      const userIndex = database.getIndex(id);

      database.delete(userIndex);

      const allUsers = database.list();
      const result = allUsers.map((user) => user.toJson());

      return SuccessResponse.ok(res, "User successfully deleted", result);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public create(req: Request, res: Response) {
    try {
      const { name, age, cpf, email } = req.body;
      const database = new UserDatabase();
      const user = new User(name, Number(age), cpf, email);

      database.create(user);

      return SuccessResponse.created(
        res,
        "New user successfully created",
        user
      );
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
