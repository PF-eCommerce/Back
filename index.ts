import app from "./src/app";
import mongooseConection from "./src/database/database";
const PORT: number | string = process.env.PORT || 3001;
mongooseConection();
app.listen(PORT, () => console.log(`server running on port : ${PORT}`));
