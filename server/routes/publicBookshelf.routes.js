const router = require("express").Router();
const mongoose = require('mongoose');
const {PublicBookshelf} = require("../models/PublicBookshelf.model")
const User = require('../models/User.model')


//TEST
router.post("/test/simple", (req, res) => {
  const {name} = req.body
  PublicBookshelf.create({"name": name})
  .then(result => res.json(result))
  .catch(err => console.log(err))
})








//BOOKSHELF MAIN

router.get("/", (req, res) => {
    res.json("BookShelf main - All good in here");
  });
  
  
//GET PUBLIC BOOKSHELF BY ID

router.get("/:bookshelfId", (req, res) => {
    const { bookshelfId } = req.params; 
   
    if (!mongoose.Types.ObjectId.isValid(bookshelfId)) {
      res.status(400).json({ message: 'Specified bookshelf does not exist' }); 
      return;
    }
   
    PublicBookshelf.findById(bookshelfId)
      .populate('owner')
      .populate("shelves")
      .then(publicShelf => res.json(publicShelf))
      .catch(err => res.json(err));
});
  

  
  //EDIT PUBLIC BOOKSHELF NAME
  
  router.get("/:bookshelfId/edit", (req, res) => {
    res.json("this is my editPublicBookshelf page. ")
  })
  
  
  router.put("/:bookshelfId/edit", (req, res) => {
    const { bookshelfId } = req.params;
    const {name} = req.body
  
  
    if (!mongoose.Types.ObjectId.isValid(bookshelfId)) {
      res.status(400).json({ message: 'Specified bookshelf does not exist' });
      return;
    }
   
    PublicBookshelf.findByIdAndUpdate(bookshelfId, {"name": name}, {new: true})
      .populate("shelves")
      .then((editedBookshelf) => {console.log(editedBookshelf) ; res.json(editedBookshelf)})
      .catch(error => res.json(error));
  
  })
  

  module.exports = router;