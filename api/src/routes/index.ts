import express from "express";
import inscripcionRouter from "@/modules/inscripcion/inscripcion.routes";
import scheduledRouter from "@/modules/scheduled_app/scheduled_app.routes";
const router = express.Router();

router.use("/inscripcion", inscripcionRouter);
router.use("/processPayments", scheduledRouter);

export default router;
