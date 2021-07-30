const router = require("express").Router();
const mongoose = require('mongoose');
const {PrivateBookshelf} = require("../models/PrivateBookshelf.model")
const {PrivateShelf} = require("../models/PrivateBookshelf.model")

const User = require('../models/User.model')

//PATH /api/private-shelves


// CREATE PRIVATE SHELF AND APPEND TO PRIVATE BOOKSHELF
router.post("/create", (req, res) => {
    const {name, privateBookshelf} = req.body

    PrivateShelf.create({"name": name, "privateBookshelf": privateBookshelf})
    .then(createdShelf => {
      PrivateBookshelf.findByIdAndUpdate(privateBookshelf, {$addToSet: {shelves: createdShelf._id}}, {new:true})
      .then(bookshelf => res.json(bookshelf))
    })

});


// MOVE BOOK FROM SHELF TO SHELF

router.put("/moveBook", (req, res) => {
  const {shelfFrom, shelfTo, bookId} = req.body

  PrivateShelf.findById(shelfFrom)
  .then(shelf => {
    console.log("shelf: ", shelf)
    shelf.ebooks.pull(bookId)
    return shelf.save()
  })
  .then(changedShelf => {
    console.log("changedShelf: ", changedShelf)
    PrivateShelf.findById(shelfTo)
    .then(shelf => {
      shelf.ebooks.push(bookId)
      return shelf.save()
    })
    .then(shelfToUpdated => res.json(shelfToUpdated))
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))

})

  

// EDIT PRIVATE SHELF
  
router.put("/:shelfId/edit", (req, res) => {
    const { shelfId } = req.params;
    const {name} = req.body
  
    if (!mongoose.Types.ObjectId.isValid(shelfId)) {
      res.status(400).json({ message: 'Specified shelf does not exist' });
      return;
    }
  
    PrivateShelf.findByIdAndUpdate(shelfId, {"name": name}, {new: true})
    .populate('ebooks')
    .then(editedShelf => res.json(editedShelf))
    .catch(err => res.json(err))

});
  



//DELETE PRIVATE SHELF
  
router.delete("/:shelfId/delete", (req, res) => {
    const {shelfId} = req.params
        
    if (!mongoose.Types.ObjectId.isValid(shelfId)) {
        res.status(400).json({ message: 'Specified shelf does not exist' });
        return;
    }
       
    PrivateShelf.findByIdAndRemove(shelfId)
    .then(() => res.json({ message: `Shelf was successfully removed.` }))
    .catch(err => res.json(err));

})
    



// RETURN SHELF DETAILS
router.get("/:shelf", (req, res) => {
    const {shelf} = req.params

    if (!mongoose.Types.ObjectId.isValid(shelf)) {return res.status(400).json({ message: 'Specified shelf does not exist' })}

    PrivateShelf.findById(shelf)
    .populate("ebooks")
    .then(foundShelf => res.json(foundShelf))
    .catch(err => console.log(err))

});

module.exports = router;