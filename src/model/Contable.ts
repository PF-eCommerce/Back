import mongoose from "mongoose";
import { IContable } from "../types";

const ContableSchema = new mongoose.Schema<IContable>({
  inversionTotal: {
    type: Number,
    required: true,
  },
  inversionMensual: {
    type: Number,
  },
  inversionAnual: {
    type: Number,
  },
  gananciaTotal: {
    type: Number,
  },
  gananciaMensual: {
    type: Number,
  },
  gananciaAnual: {
    type: Number,
  },
  presupuestoTotal: {
    type: Number,
  },
  presupuestoMensual: {
    type: Number,
  },
  presupuestoAnual: {
    type: Number,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Contable = mongoose.model<IContable>("Contable", ContableSchema);

export default Contable;
