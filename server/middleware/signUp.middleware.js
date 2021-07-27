const mongoose = require('mongoose');
const {PrivateBookshelf} = require('../models/PrivateBookshelf.model')
const {PublicBookshelf} = require('../models/PublicBookshelf.model');

const User = require('../models/User.model')


function publicBS(name, owner, user) {

    return PublicBookshelf.create({
        name,
        owner
    })
    .then(bookshelf => {
        user.publicBookshelf = bookshelf
        return user.save()
    }).catch(err => console.log(err))

}
      
      
function privateBS(name, owner, user) {

    return PrivateBookshelf.create({
      name, 
      staticShelf: [], 
      owner
    })
    .then(bookshelf => {
        user.privateBookshelf = bookshelf
        return user.save()
    }).catch(err => console.log(err))
}
  



module.exports = {publicBS: publicBS, privateBS: privateBS};