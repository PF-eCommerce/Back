"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./src/app");
const Port = process.env.Port || 3001;
app_1.app.listen(Port, () => console.log(`server running on port : ${port}`));
