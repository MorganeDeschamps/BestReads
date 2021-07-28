const router = require("express").Router();
const mongoose = require('mongoose');
const {PublicBookshelf} = require("../models/PublicBookshelf.model")
const {PublicShelf} = require("../models/PublicBookshelf.model")

const User = require('../models/User.model')

// PATH /api/public-shelves


router.post("/test/simple", (req, res) => {
  const {bookshelfId} = req.body


  const basicShelves = [
    {name: "Currently reading", publicBookshelf: bookshelfId}, 
    {name: "Want to read", publicBookshelf: bookshelfId}, 
    {name: "Read", publicBookshelf: bookshelfId}]
    
    
  PublicShelf.insertMany(basicShelves)
  .then(createdShelves => {
    PublicBookshelf.findById(bookshelfId)
    .then(bookshelf => {
      bookshelf.shelves = [...bookshelf.shelves, ...createdShelves]
      return bookshelf.save()
    })
    .then(bs => res.json(bs))
    .catch(err => console.log(err))

  })
  .catch(err => console.log(err))

})



 // CREATE PUBLIC SHELF AND APPEND TO PUBLIC BOOKSHELF

router.get("/create", (req, res) => {
    res.json("this is my Create PublicShelf page.")
});
  
  
router.post("/create", (req, res) => {
    const {name, books, publicBookshelf} = req.body
  
    PublicShelf.create({
      name,
      books,
      publicBookshelf
    })
    .then(createdShelf => {
      PublicBookshelf.findByIdAndUpdate(publicBookshelf, {$addToSet: {shelves: createdShelf._id}}, {new:true})
      .then(user => res.json(user))
    })

});








//ADD EBOOK TO SHELF

router.put("/addBook", (req, res) => {
  const {shelf, book} = req.body

  PublicShelf.findByIdAndUpdate(shelf, {$addToSet: {books: book}}, {new:true})
  .then(shelf => res.json(shelf))
  .catch(err => console.log(err))

})



// MOVE BOOK FROM SHELF TO SHELF

router.put("/moveBook", (req, res) => {
  const {shelfFrom, shelfTo, book} = req.body

  PublicShelf.findById(shelfFrom).then(shelf => {
    console.log("shelf: ", shelf)
    shelf.books = shelf.books.filter((eachBook) => eachBook._id !== book._id)
    return shelf.save()
  })
  .then(changedShelf => {
    console.log("changedShelf: ", changedShelf)
    PublicShelf.findById(shelfTo).then(shelf => {
      shelf.books.push(book)
      return shelf.save()
    })
    .then(shelfToUpdated => res.json(shelfToUpdated))
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))

})



  
  


// EDIT PUBLIC SHELF
  
router.get("/:shelfId/edit", (req, res) => {
    res.json("this is my Edit PublicShelf page. ")
});
  

//edit name
router.put("/:shelf/edit", (req, res) => {
    const { shelf } = req.params;
    const {name} = req.body


    if(!mongoose.Types.ObjectId.isValid(shelf)) {
      res.status(400).json({ message: 'Specified shelf does not exist' });
      return;
    }

    PublicShelf.findByIdAndUpdate(shelf, {"name": name}, {new: true})
    .then(editedShelf => res.json(editedShelf))

});
  



//DELETE PUBLIC SHELF
  
router.delete("/:shelfId/delete", (req, res) => {
    const {shelfId} = req.params
    if (!mongoose.Types.ObjectId.isValid(shelfId)) {
        return res.status(400).json({ message: 'Specified shelf does not exist' });
    }
       

    PublicShelf.findByIdAndRemove(shelfId)
    .then(() => res.json({ message: `Shelf was successfully removed.` }))
    .catch(err => res.json(err));

      
})



// RETURN SHELF DETAILS
router.get("/:shelfId", (req, res) => {
    const {shelfId} = req.params

    if (!mongoose.Types.ObjectId.isValid(shelfId)) {return res.status(400).json({ message: 'Specified shelf does not exist' })}


    PublicShelf.findById(shelfId)
      .then(foundShelf => res.json(foundShelf))
      .catch(err => console.log(err))

});


module.exports = router;

      