const router = require("express").Router();
const mongoose = require('mongoose');
const {PrivateBookshelf} = require("../models/PrivateBookshelf.model")
const User = require('../models/User.model')




// GET PRIVATE BOOKSHELF BY ID

router.get("/:bookshelfId", (req, res) => {
  const { bookshelfId } = req.params; 
 
  if (!mongoose.Types.ObjectId.isValid(bookshelfId)) {
    res.status(400).json({ message: 'Specified bookshelf does not exist' }); 
    return;
  }
 
  PrivateBookshelf.findById(bookshelfId)
    .populate('owner')
    .populate('shelves')
    .then(privateBookshelf => res.json(privateBookshelf))
    .catch(err => res.json(err));
});



// CREATE PRIVATE BOOKSHELF AND APPEND TO USER

router.get("/create", (req, res) => {
  res.json("this is my createBookShelf page. ")
});



//EDIT PRIVATE BOOKSHELF

router.put("/:bookshelfId/edit", (req, res) => {
  const { bookshelfId } = req.params;
  const {name} = req.body

  if (!mongoose.Types.ObjectId.isValid(bookshelfId)) {
    res.status(400).json({ message: 'Specified bookshelf does not exist' });
    return;
  }
 
  PrivateBookshelf.findByIdAndUpdate(bookshelfId, {"name": name}, {new: true})
    .populate("shelves")
    .then((editedBookshelf) => res.json(editedBookshelf))
    .catch(error => res.json(error));

})


//TESTING
router.get("/test/:bookId", (req, res, next) => {
  res.json(req.params.bookId);
});




module.exports = router;
