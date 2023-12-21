import express from "express";

// import routes from './routes/index.routes';

const port = 3333;
const app = express();

app.use(express.json());
// app.use(routes);
app.get("/", (req, res) => {
  res.send("Welcome to transportation API!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
