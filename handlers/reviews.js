const db = require('../models');

const getReviews = async () => {
	try {
		const reviews = await db.Review.findAll();
		return reviews;
	} catch(error) {
		console.log('Error @handlers/getReviews:', err);
		return null;
	}
};

const getUserReviewsWithId = async id => {
	try {
		const user = await db.User.findByPk(id);
		const reviews = await user.getReviews();
		return reviews;
	} catch(err) {
		console.log('Error @handlers/getUserREviewsWithId:', err);
		return null;
	}
};

const addReviewHandler = async (userId, gameId, rating, comment) => {
	try {
		const user = await db.User.findByPk(userId);
		const game = await db.Game.findByPk(gameId);

		if(!user) {
			return {
				message: 'User does not exist',
			}
		}
		if(!game) {
			return {
				message: 'Game does not exist'
			}
		}

		await db.Review.create({
			UserId: userId,
			GameId: gameId,
			rating: rating,
			comment: comment,
		})

		return {
			message: 'Success'
		}
	} catch(err) {
		console.error('Error @addReviewHandler:', err);
		return { message: err.message}
	}
}

const editReviewHandler = async (UserId, GameId, comment, rating) => {
	
	try {
		let review = await db.Review.findOne({where: {
			UserId: UserId,
			GameId: GameId
		}});
	
		if (!review) {
		  return {
			message: "Review does not exist. Nothing to edit."
		  }
		}

		if(comment) {
			review.comment = comment;
		}
		if(rating) {
			review.rating = rating;
		}

		res = await review.save(); // this updates the db.
		return {
		  obiect: res.toString(),
		  message: "Succsess:",
	
		}
	
	  } catch (err) {
		console.log("Error @handlers/editReviewHandler:", err);
		return {
		  message: err,
		  obj: null
		}
	  }
}

const removeReviewHandler = async (userId, gameId) => {
	try {
		const user = await db.User.findByPk(userId);
		const game = await db.Game.findByPk(gameId);

		if(!user) {
			return {
				message: 'User does not exist',
			}
		}
		if(!game) {
			return {
				message: 'Game does not exist'
			}
		}

		const toBeDeleted = await db.Review.findOne({
			where: {
				UserId: userId,
				GameId: gameId,
			}
		});
		
		if(!toBeDeleted) {
			return {
				message: 'Review does not exist'
			}
		}

		res = db.Review.destroy({
			where: {
				UserId : toBeDeleted.UserId,
				GameId : toBeDeleted.GameId
			}
		})

		return {
			message: 'Success'
		}

	} catch(err) {
		console.error('Error @removeReviewHandler:', err);
		return { message: err.message}
	}
}


module.exports = { getReviews, getUserReviewsWithId, addReviewHandler, removeReviewHandler, editReviewHandler }