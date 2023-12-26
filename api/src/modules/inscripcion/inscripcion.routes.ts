import { validate } from "@/commons/middlewares/validation.middleware";
import express, { Router } from "express";
import { InscripcionController } from "./inscripcion.controller";
import { container } from "tsyringe";
import InscripcionRequestDTO from "./dtos/inscripcionRequestDTO";

//container.register('IInscripcionService', { useClass: ImscripcionService });
const inscripcionController: InscripcionController =
  new InscripcionController();

const router: Router = express.Router();

router
  .route("/")
  .post(
    validate(InscripcionRequestDTO),
    inscripcionController.incripcion.bind(inscripcionController)
  );
router
  .route("/confirmar")
  .post(inscripcionController.confirmar.bind(inscripcionController)); 

export default router;
