const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLFloat,
  GraphQLString,
} = require("graphql");
const {
  addReviewHandler,
  removeReviewHandler,
} = require("../../handlers/reviews");
const { reviewResultType } = require("./types");

const reviewMutation = new GraphQLObjectType({
  name: "ReviewMutation",
  fields: {
    // currently logged user makes a review
    review: {
      type: reviewResultType,
      args: {
        GameId: { type: new GraphQLNonNull(GraphQLID) },
        rating: { type: GraphQLFloat },
        comment: { type: GraphQLString },
      },
      resolve: async (source, { GameId, rating, comment }, context) => {
        if (!context.user) return null;
        const result = await addReviewHandler(
          context.user.id,
          GameId,
          rating,
          comment
        );
        return result;
      },
    },

    // add review to user by usesrId. #ROLE Only admins should be able to do this
    addReviewToUser: {
      type: reviewResultType,
      args: {
        UserId: { type: new GraphQLNonNull(GraphQLID) },
        GameId: { type: new GraphQLNonNull(GraphQLID) },
        rating: { type: GraphQLFloat },
        comment: { type: GraphQLString },
      },
      resolve: async (source, { UserId, GameId, rating, comment }, context) => {
        if (
          !context.user ||
          !(await context.user.can(AdminPermissions.FULL_ACCESS_REVIEW))
        )
          return null;

        const result = await addReviewHandler(UserId, GameId, rating, comment);
        return result;
      },
    },

    // delete review from db. #ROLE only admins should be able to do this
    removeReview: {
      type: reviewResultType,
      args: {
        UserId: { type: new GraphQLNonNull(GraphQLID) },
        GameId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (source, { UserId, GameId }, context) => {
        if (
          !context.user ||
          !(await context.user.can(AdminPermissions.FULL_ACCESS_REVIEW))
        )
          return null;

        const result = await removeReviewHandler(UserId, GameId);
        return result;
      },
    },
  },
});

module.exports = reviewMutation;
