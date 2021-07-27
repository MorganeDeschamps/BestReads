const mongoose = require('mongoose');
const {PublicBookshelf} = require("../models/PublicBookshelf.model")
const User = require('../models/User.model')


function publicBS(name, owner) {

        PublicBookshelf.create({
            name,
            currentlyReading: [],
            wantToRead: [],
            read: [],
            owner
        })
        .then(createdBookshelf => {
          User.findByIdAndUpdate(owner, {$addToSet: {publicBookshelf: createdBookshelf._id}}, {new:true})
          .then(user => {
            console.log(user)
            res.json(createdBookshelf)
          })
        })
        
}
      
      



module.exports = {publicBS: publicBS};