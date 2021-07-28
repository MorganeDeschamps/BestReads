const mongoose = require('mongoose');
const {PrivateBookshelf, PrivateShelf} = require('../models/PrivateBookshelf.model')
const {PublicBookshelf, PublicShelf} = require('../models/PublicBookshelf.model');


function publicBS(name, owner, user) {
    let nameBS = `${name}'s public bookshelf`

    return PublicBookshelf.create({"name": nameBS, "owner": owner})
    .then(bookshelf => {
        const {bookshelfId} = bookshelf._id


        const basicShelves = [
            {name: "Currently reading", publicBookshelf: bookshelfId}, 
            {name: "Want to read", publicBookshelf: bookshelfId}, 
            {name: "Read", publicBookshelf: bookshelfId}
        ]
        
        return PublicShelf.insertMany(basicShelves)
        .then(createdShelves => {
            bookshelf.shelves = [...bookshelf.shelves, ...createdShelves]
            return bookshelf.save()
        })
        .then(bookshelf => {
            user.publicBookshelf = bookshelf
            return user.save()
        }).catch(err => console.log(err))

    }).catch(err => console.log(err))

}
      
      
function privateBS(name, owner, user) {
    let nameBS = `${name}'s private bookshelf`

    return PrivateBookshelf.create({"name": nameBS, "owner": owner})
    .then(bookshelf => {
        const {bookshelfId} = bookshelf._id
        const main = {name: "Main shelf", publicBookshelf: bookshelfId}

        return PrivateShelf.create(main)
        .then(createdShelf => {
            bookshelf.shelves.push(createdShelf)
            return bookshelf.save()
        })
        .then(bookshelf => {
            user.privateBookshelf = bookshelf
            return user.save()
        }).catch(err => console.log(err))

    }).catch(err => console.log(err))
}
  



module.exports = {publicBS: publicBS, privateBS: privateBS};