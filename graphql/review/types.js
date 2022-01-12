const { GraphQLObjectType, GraphQLString, GraphQLFloat } = require("graphql");
const { gameType } = require("../game/types");
const { userType } = require("../user/types");

const reviewType = new GraphQLObjectType({
	name: "ReviewType",
	fields: {
		comment: { type: GraphQLString },
		rating: { type: GraphQLFloat },
		user: { 
			type: userType, 
			resolve: async source => {
				return await source.getUser();
			}
		},
		game: { 
			type: gameType,
			resolve: async source => {
				return await source.getGame();
			},
		},
	},
});

const reviewResultType = new GraphQLObjectType({
	name: 'reviewResult',
	fields: {
		message: { type: GraphQLString }
	},
});
module.exports = { reviewType, reviewResultType };