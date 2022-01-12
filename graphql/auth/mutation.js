const {
  loginResultType,
  loginInputType,
  registerInputType,
  registerResultType,
  messageResultType,
} = require("./types");
const loginHandler = require("../../handlers/auth");
const { createUser } = require("../../handlers/users");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");
const { AdminPermissions } = require("../../utils/constants");
const {
  grantAdminRole,
  revokeAdminRole,
} = require("../../handlers/authorization");
const { checkAuthorizationStatus } = require("../utils");

const authMutation = new GraphQLObjectType({
  name: "AuthMutation",
  fields: {
    login: {
      type: loginResultType,
      args: {
        loginInput: { type: loginInputType },
      },
      resolve: async (source, args) => {
        const { username, password } = args.loginInput;

        const token = await loginHandler(username, password);

        return {
          token,
        };
      },
    },

    register: {
      type: registerResultType,
      args: {
        registerInput: { type: registerInputType },
      },
      resolve: async (source, args) => {
        const data = args.registerInput;
        const result = await createUser(data);

        return result;
      },
    },

    grantAdminRole: {
      type: messageResultType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (source, args, context) => {
        const authzStatus = await checkAuthorizationStatus(
          context,
          AdminPermissions.UPDATE_ROLE
        );
        if (authzStatus) return authzStatus;

        const id = args.id;
        const result = await grantAdminRole(id);
        return result;
      },
    },

    revokeAdminRole: {
      type: messageResultType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (source, args, context) => {
        const authzStatus = await checkAuthorizationStatus(
          context,
          AdminPermissions.UPDATE_ROLE
        );
        if (authzStatus) return authzStatus;

        const id = args.id;
        const result = await revokeAdminRole(id);
        return result;
      },
    },
  },
});

module.exports = authMutation;
