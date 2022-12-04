import express from "express";

import * as contableFunction from "../../controllers/contable.controller";
const router = express.Router();
router.get("/inversion", contableFunction.getInversión);
router.get("/inversion/total", contableFunction.getTotalInvertido);
router.post("/inversion", contableFunction.postInversión);
router.get("/presupuesto", contableFunction.getPresupuestoTotal);
router.get("/presupuesto/mes", contableFunction.getPresupuestoMensual);
router.get("/presupuesto/year", contableFunction.getPresupuestoAnual);
router.get("/ganancias", contableFunction.getGanancias);
router.get("/ganancias/mes", contableFunction.getGananciaMensual);
router.get("/ganancias/year", contableFunction.getGananciaAnual);
export default router;
