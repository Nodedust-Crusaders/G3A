const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInputObjectType,
} = require("graphql");
const { userType } = require("../user/types");

const loginInputType = new GraphQLInputObjectType({
  name: "LoginInput",
  fields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const loginResultType = new GraphQLObjectType({
  name: "LoginResult",
  fields: {
    token: { type: GraphQLString },
  },
});

const registerInputType = new GraphQLInputObjectType({
  name: "RegisterInput",
  fields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const registerResultType = new GraphQLObjectType({
  name: "RegisterResult",
  fields: {
    message: { type: new GraphQLNonNull(GraphQLString) },
  },
});

module.exports = {
  loginInputType,
  loginResultType,
  registerInputType,
  registerResultType,
};
