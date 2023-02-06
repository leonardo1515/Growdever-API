import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { TransactionsController } from "../controllers/transactions.controller";
import { UpdateValidatorMiddleware } from "../middlewares/update-validator.middleware";
import { DeleteValidatorMiddleware } from "../middlewares/delete-validator.middleware";
import { CreateValidatorMiddleware } from "../middlewares/user-validator.middleware";
import { IdValidatorMiddleware } from "../middlewares/id-validator.middleware";
import { CpfValidatorMiddleware } from "../middlewares/cpf-validator.middleware";
import { EmailValidatorMiddleware } from "../middlewares/email-validator.middleware";
import { TransactionsValidatorMiddleware } from "../middlewares/transaction-validator.middleware";
import { AllValidatorMiddleware } from "../middlewares/transactions-all-validator.middleware";
import { OneValidatorMiddleware } from "../middlewares/transaction-one-validatore.middleware";
import { TransactionUpValidatorMiddleware } from "../middlewares/transactons-update-validator.middleware";
import { TransactionDelValidatorMiddleware } from "../middlewares/transaction-delete-validator.middleware";

const middlewareLog = [
  CreateValidatorMiddleware.createValidator,
  CpfValidatorMiddleware.cpfValidator,
  EmailValidatorMiddleware.emailValidator,
];

export const userRoutes = () => {
  const app = Router();

  app.get("/:id", IdValidatorMiddleware.idValidator, new UserController().get);

  app.get("/", new UserController().getFilter);

  app.post("/", middlewareLog, new UserController().create);

  app.put(
    "/:id",
    UpdateValidatorMiddleware.updateValidator,
    new UserController().update
  );

  app.delete(
    "/:id",
    DeleteValidatorMiddleware.deleteValidator,
    new UserController().delet
  );

  app.post(
    "/:userId/trasactions",
    TransactionsValidatorMiddleware.transactionValidator,
    new TransactionsController().add
  );

  app.get(
    "/:userId/trasactions/:transactionId",
    OneValidatorMiddleware.transactionOneValidator,
    new TransactionsController().getOne
  );

  app.get(
    "/:userId/trasactions",
    AllValidatorMiddleware.transactionAllValidator,
    new TransactionsController().getAll
  );

  app.put(
    "/:userId/transactions/:idTransaction",
    TransactionUpValidatorMiddleware.transactionUpdateValidator,
    new TransactionsController().update
  );

  app.delete(
    "/:userId/transactions/:idTransaction",
    TransactionDelValidatorMiddleware.transactionDelValidator,
    new TransactionsController().delete
  );

  return app;
};
