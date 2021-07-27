const mongoose = require('mongoose');
const {PrivateBookshelf} = require('../models/PrivateBookshelf.model')
const {PublicBookshelf} = require('../models/PublicBookshelf.model');

const User = require('../models/User.model')


function publicBS(name, owner) {

    return PublicBookshelf.create({
        name,
        owner
    })
    .then(createdBookshelf => {
        return User.findByIdAndUpdate(owner, {$addToSet: {publicBookshelf: createdBookshelf._id}}, {new:true})
        .then(user => {
            console.log(user)
            return user
        })
    }).then(user => {return user})

}
      
      
function privateBS(name, owner) {

    return PrivateBookshelf.create({
      name, 
      staticShelf: [], 
      owner
    })
    .then(createdBookshelf => {
      return User.findByIdAndUpdate(owner, {$addToSet: {privateBookshelf: createdBookshelf._id}}, {new:true})
      .then(user => {
        console.log(user);
        return user
      })
    }).then(user => {return user})
}
  



module.exports = {publicBS: publicBS, privateBS: privateBS};