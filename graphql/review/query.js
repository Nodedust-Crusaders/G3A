const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = require("graphql");
const { getUserReviewsWithId, getReviews, getGameReviewsWithId } = require("../../handlers/reviews");
const { reviewType } = require("./types");

const reviewQuery = new GraphQLObjectType({
	name: 'ReviewQuery',
	fields: {
		//get all reviews from db
		reviews: {
			type: new GraphQLList(reviewType),
			resolve: async (source, args, context) => {
				if(!context.user) return null;
				return getReviews();
			}
		},
		// get all reviews of current user
		userReviews: {
			type: new GraphQLList(reviewType),
			resolve: async (source, args, context) => {
				if(!context.user) return null;
				return getUserReviewsWithId(context.user.id);
			}
		},
		// get all reviews of an user by id
		reviewsWithUserId: {
			type: new GraphQLList(reviewType),
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve: async (source, { id }, context) => {
				if(!context.user) return null;
				return getUserReviewsWithId(id);
			}
		},

		reviewsWithGameId: {
			type: new GraphQLList(reviewType),
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve: async (source, { id }, context) => {
				if(!context.user) return null;
				return getGameReviewsWithId(id);
			}
		}
	}
});

module.exports = reviewQuery;