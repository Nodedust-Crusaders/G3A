const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull,
  } = require("graphql");
  const {
    createPlatform,
    editPlatform,
    destroyPlatform,
  } = require("../../handlers/platforms");
  const { AdminPermissions } = require("../../utils/constants");
  const {
    platformType,
    platformInputType,
    platformResultType,
  } = require("./types");
  
  const platformMutation = new GraphQLObjectType({
    name: "PlatformMutation",
    fields: {
      addPlatform: {
        type: platformResultType,
        args: {
          platformInput: { type: platformInputType },
        },
        resolve: async (source, args, context) => {
          if (
            !context.user ||
            !(await context.user.can(AdminPermissions.FULL_ACCESS_CATEGORY))
          )
            return null;
  
          const data = args.platformInput;
          const result = await createPlatform(data);
  
          return result;
        },
      },
      editPlatform: {
        type: platformResultType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
          data: { type: platformInputType },
        },
        resolve: async (source, args, context) => {
          if (
            !context.user ||
            !(await context.user.can(AdminPermissions.FULL_ACCESS_CATEGORY))
          )
            return null;
  
          const id = args.id;
          const data = args.data;
          const result = await editPlatform(id, data);
  
          return result;
        },
      },
      removePlatform: {
        type: platformResultType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve: async (source, args, context) => {
          if (
            !context.user ||
            !(await context.user.can(AdminPermissions.FULL_ACCESS_CATEGORY))
          )
            return null;
  
          const result = await destroyPlatform(args.id);
          return result;
        },
      },
    },
  });
  
  module.exports = platformMutation;