const router = require('express').Router();

// ℹ️ Handles password encryption
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require('../models/User.model');
const Session = require('../models/Session.model');

const {publicBS} = require("../middleware/signUp.middleware")
const {privateBS} = require("../middleware/signUp.middleware")

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require('../middleware/isLoggedOut');
const isLoggedIn = require('../middleware/isLoggedIn');




//user.privateBookshelf = dofguheiguhe
//user.save()

router.get('/session', (req, res) => {
	// we dont want to throw an error, and just maintain the user as null
	if (!req.headers.authorization || req.headers.authorization === 'null') {
		return res.json(null);
	}

	// accessToken is being sent on every request in the headers
	const accessToken = req.headers.authorization;
	console.log(typeof req.header.authorization);
	Session.findById(accessToken)
		.populate('user')
		.populate({
			path: 'user',
			populate: { path: 'publicBookshelf' , populate: { path: 'shelves' }}
		})
		.populate({
			path: 'user',
			populate: { path:'privateBookshelf', populate: { path: 'shelves' , populate: { path: "ebooks" }}}
		})
		.populate({
			path: 'user',
			populate: { path: 'reviews'}
		})
		.then((session) => {
			if (!session) {
				return res.status(404).json({ errorMessage: 'Session does not exist' });
			}
			return res.status(200).json(session);
		});
});

  
router.post('/signup', isLoggedOut, (req, res) => {
	const { username, password, email } = req.body;

	if (!username) {
		return res
			.status(400)
			.json({ errorMessage: 'Please provide your username.' });
	}

	if (password.length < 3) {
		return res.status(400).json({
			errorMessage: 'Your password needs to be at least 8 characters long.'
		});
	}

	// Search the database for a user with the username submitted in the form
	User.findOne({ username }).then((found) => {
		// If the user is found, send the message username is taken
		if (found) {
			return res.status(400).json({ errorMessage: 'Username already taken.' });
		}

		// if user is not found, create a new user - start with hashing the password
		return bcrypt
			.genSalt(saltRounds)
			.then((salt) => bcrypt.hash(password, salt))
			.then((hashedPassword) => {
				// Create a user and save them in the database

				return User.create({
					username,
					password: hashedPassword,
					email
				});
			})

			.then((user) => {return privateBS(user.username, user._id, user)})
			.then((user) => {return publicBS(user.username, user._id, user)})
			.then(user => {
				Session.create({
					user: user._id,
					createdAt: Date.now()
				}).then((session) => {
					res.status(201).json({ user, accessToken: session._id });
				});
			})
			.catch((error) => {
				console.log('oh, no!');
				if (error instanceof mongoose.Error.ValidationError) {
					return res.status(400).json({ errorMessage: error.message });
				}
				if (error.code === 11000) {
					return res.status(400).json({
						errorMessage:
							'Username need to be unique. The username you chose is already in use.'
					});
				}
				return res.status(500).json({ errorMessage: error.message });
			});
	});
});



router.post('/login', isLoggedOut, (req, res, next) => {
	const { username, password } = req.body;

	if (!username) {
		return res
			.status(400)
			.json({ errorMessage: 'Please provide your username.' });
	}

	// Here we use the same logic as above
	// - either length based parameters or we check the strength of a password
	if (password.length < 8) {
		return res.status(400).json({
			errorMessage: 'Your password needs to be at least 8 characters long.'
		});
	}

	// Search the database for a user with the username submitted in the form
	User.findOne({ username })
		.then((user) => {
			// If the user isn't found, send the message that user provided wrong credentials
			if (!user) {
				return res.status(400).json({ errorMessage: 'Wrong credentials.' });
			}

			// If user is found based on the username, check if the in putted password matches the one saved in the database
			bcrypt.compare(password, user.password).then((isSamePassword) => {
				if (!isSamePassword) {
					return res.status(400).json({ errorMessage: 'Wrong credentials.' });
				}
				Session.create({ user: user._id, createdAt: Date.now() }).then(
					(session) => {
						return res.json({ user, accessToken: session._id });
					}
				);
			});
		})

		.catch((err) => {
			// in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
			// you can just as easily run the res.status that is commented out below
			next(err);
			// return res.status(500).render("login", { errorMessage: err.message });
		});
});


// SEE USER PROFILE DETAILS

router.post('/profile/user', (req, res) => {
	const {userId} = req.body
	console.log(userId)
	User.findById(userId)
	.populate('publicBookshelf')
	.populate('privateBookshelf')
	.populate({
		path: 'publicBookshelf',
		populate: { path: 'shelves' }
	})
	.populate({
		path: 'privateBookshelf',
		populate: { path: 'staticShelf' }
	})
	.populate({
		path: 'privateBookshelf',
		populate: { path: 'dynamicShelves' }
	})
	.populate('reviews')
	.then(profile => res.json(profile))
	.catch(err => res.json(err))
});


// EDIT USER PROFILE

router.get("/profile/:userId/edit", (req, res) => {
	res.json("this is my editEbook page. ")
  })
  
  
router.put("/profile/:userId/edit", (req, res) => {
	const { userId } = req.params;
	const { username, email, imageUrl} = req.body
  
	if (!mongoose.Types.ObjectId.isValid(userId)) {
	  res.status(400).json({ message: 'Specified User Profile does not exist' });
	  return;
	}
   
	User.findByIdAndUpdate(userId, { username, email, imageUrl }, {new: true})
	.then(editedUser => res.json(editedUser))
	.catch(err => res.json(err));
  
})


  
// LOGOUT USER

router.delete('/logout', isLoggedIn, (req, res) => {
	Session.findByIdAndDelete(req.headers.authorization)
		.then(() => {
			res.status(200).json({ message: 'User was logged out' });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ errorMessage: err.message });
		});
});

module.exports = router;
