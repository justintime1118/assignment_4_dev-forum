import bodyParser from "body-parser";
import express from "express";
import { controllers } from "./contexts";
import authenticator from "./middlewares/authenticator.middleware";

const app = express();
const port = 5050;
const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(authenticator);
app.use("/", controllers);

app.listen(port, () => {
  console.log("server is listening");
});
