const express = require("express");
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();

const schema = require("./graphql");
const authorizationMiddleware = require("./middlewares/authorization");
const { getAllUsers, getUsersPurchasesById } = require("./handlers/users");

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(
  "/graphql",
  authorizationMiddleware,
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/users", getAllUsers);

app.get("/users/:id/purchases", getUsersPurchasesById);

app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});
