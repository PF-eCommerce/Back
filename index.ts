import app from "./src/app";
import mongooseConection from "./src/database/database";
const Port: number | string = process.env.PORT || 3001;
mongooseConection();
app.listen(Port, () => console.log(`server running on port : ${Port}`));
