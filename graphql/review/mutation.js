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
  editReviewHandler,
} = require("../../handlers/reviews");
const { AdminPermissions } = require("../../utils/constants");
const { reviewResultType } = require("./types");

const reviewMutation = new GraphQLObjectType({
  name: "ReviewMutation",
  fields: {
    // currently logged user makes a review
    review: {
      type: reviewResultType,
      args: {
        UserId: {type: GraphQLID},
        GameId: { type: new GraphQLNonNull(GraphQLID) },
        rating: { type: GraphQLFloat },
        comment: { type: GraphQLString },
      },
      resolve: async (source, {UserId, GameId, rating, comment }, context) => {
        if (!context.user) return null;
        if(!UserId){
          UserId = context.user.id;
        } else {
          if(!(await context.user.can(AdminPermissions.FULL_ACCESS_REVIEW))) {
            return null;
          }
        }
        const result = await addReviewHandler(
          UserId,
          GameId,
          rating,
          comment
        );
        return result;
      }
    },

    editReview: {
      type: reviewResultType,
      args: {
        UserId: { type: GraphQLID },
        GameId: { type: new GraphQLNonNull(GraphQLID) },
        comment: { type: GraphQLString },
        rating: { type: GraphQLFloat }
          
      },
      resolve: async (source, { UserId, GameId, comment, rating }, context) => {
        
        if(!context.user) return null;
        if(!UserId) {
          UserId = context.user.id;
        } else {
          if(!(await context.user.can(AdminPermissions.FULL_ACCESS_REVIEW))) {
             return null;
          }
        }
        const result = await editReviewHandler(UserId, GameId, comment, rating);

        return result;

      }
    },

    // delete review from db. #ROLE only admins should be able to do this
    removeReview: {
      type: reviewResultType,
      args: {
        UserId: { type: GraphQLID },
        GameId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (source, { UserId, GameId }, context) => {
        if(!context.user) return null;
        if(!UserId) {
          UserId = context.user.id;
        } else {
          if(!(await context.user.can(AdminPermissions.FULL_ACCESS_REVIEW))) return null;
        }
        const result = await removeReviewHandler(UserId, GameId);
        return result;
      },
    },
  },
});

module.exports = reviewMutation;
