import express from "express";

import routes from "./routes/index";

const port = 3333;
const app = express();

app.use(express.json());
app.use(routes);

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export { app, server };
