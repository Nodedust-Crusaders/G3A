const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const userType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  },
});

module.exports = { userType };
