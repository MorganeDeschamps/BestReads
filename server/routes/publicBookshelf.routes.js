const router = require("express").Router();
const mongoose = require('mongoose');
const {PublicBookshelf} = require("../models/PublicBookshelf.model")
const User = require('../models/User.model')




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
      .populate("dynamicShelves")
      .then(publicShelf => res.json(publicShelf))
      .catch(err => res.json(err));
});
  

  
  //EDIT PUBLIC BOOKSHELF
  
  router.get("/:bookshelfId/edit", (req, res) => {
    res.json("this is my editPublicBookshelf page. ")
  })
  
  
  router.put("/:bookshelfId/edit", (req, res) => {
    const { bookshelfId } = req.params;
    const {name, dynamicShelves} = req.body
  
  
    if (!mongoose.Types.ObjectId.isValid(bookshelfId)) {
      res.status(400).json({ message: 'Specified bookshelf does not exist' });
      return;
    }
   
    PublicBookshelf.findByIdAndUpdate(bookshelfId, {
        name,
        dynamicShelves
      }, {new: true})
      .populate("dynamicShelves")
      .then((editedBookshelf) => res.json(editedBookshelf))
      .catch(error => res.json(error));
  
  })
  

  module.exports = router;