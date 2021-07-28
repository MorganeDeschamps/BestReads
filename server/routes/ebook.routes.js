const router = require("express").Router();
const mongoose = require('mongoose');
const {PrivateShelf} = require("../models/PrivateBookshelf.model")
const Ebook = require("../models/Ebook.model");



//CREATE EBOOK ALL SHELVES
router.post("/create", (req, res) => {
  const { title, author, coverUrl, ebookUrl, owner} = req.body
  const shelfId = req.body.shelf

  Ebook.create({
    title,
    author,
    coverUrl, 
    ebookUrl,
    owner,    
  })
  .then(createdEbook => {

    if (!mongoose.Types.ObjectId.isValid(shelfId)) {res.status(400).json({ message: 'Specified shelf does not exist' }); return }
   
    PrivateShelf.findByIdAndUpdate(shelfId, {$addToSet: {ebooks: createdEbook._id}}, {new:true})
    .then(shelf => res.json(shelf))
    .catch(err => console.log(err))
  
  }).catch(err => console.log(err))

})



//.then(result => console.log("result in server: ", result))
//.catch(err => console.log(err))



//GET ONE EBOOK BY ID
router.get("/getBook/:ebookId", (req, res) => {
  const {ebookId} = req.params


  Ebook.findById(ebookId)
  .populate('owner')
  .then(result => res.json(result))
  .catch(err => res.json(err))

})


//EDIT EBOOK
router.put("/edit/:ebookId", (req, res) => {
  const { ebookId} = req.params;
  const { title, author, coverUrl, ebookUrl, owner } = req.body

  if (!mongoose.Types.ObjectId.isValid(ebookId)) {
    res.status(400).json({ message: 'Specified Ebook does not exist' });
    return;
  }
 
  Ebook.findByIdAndUpdate(ebookId, { title, author, coverUrl, ebookUrl, owner }, {new: true})
    .then(editedEbook => res.json(editedEbook))
    .catch(err => res.json(err));

})



//DELETE Ebook
router.delete("/delete/:ebookId", (req, res) => {
  const {ebookId} = req.params
  if (!mongoose.Types.ObjectId.isValid(ebookId)) {
    res.status(400).json({ message: 'Specified Ebook does not exist' });
    return;
  }
 
  Ebook.findByIdAndRemove(ebookId)
    .then(() => res.json({ message: `Ebook was successfully removed.` }))
    .catch(err => res.json(err));

})





module.exports = router;
