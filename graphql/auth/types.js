const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLUnionType,
} = require("graphql");
const db = require("../../models");
const { userType } = require("../user/types");
const { messageResultType } = require("../types");

// const messageResultType = new GraphQLObjectType({
//   name: "MessageResult",
//   fields: {
//     message: { type: new GraphQLNonNull(GraphQLString) },
//   },
// });

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

const registerResultType = new GraphQLUnionType({
  name: "RegisterResult",
  types: [userType, messageResultType],
  resolveType: (value) => {
    if (value instanceof db.User) {
      return "UserType";
    }

    return "MessageResult";
  },
});

module.exports = {
  loginInputType,
  loginResultType,
  registerInputType,
  registerResultType,
  messageResultType,
};
