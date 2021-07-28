const { Schema, model } = require('mongoose');


//PUBLIC SHELVES

const publicShelfSchema = new Schema(
	{
		name: String,
		books: [Object],
		publicBookshelf: { type: Schema.Types.ObjectId, ref: "PublicBookshelf" }
	}
)
const PublicShelf = model('PublicShelf', publicShelfSchema)


//PUBLIC BOOKSHELVES

const publicBookshelfSchema = new Schema(
	{
		name: String,
		currentlyReading: [Object],
		wantToRead: [Object],
		read: [Object],
		dynamicShelves: [{ type: Schema.Types.ObjectId, ref: "PublicShelf",  default: []}],
		owner: { type: Schema.Types.ObjectId, ref: "User" }
	},
	{
		timestamps: true
	}
);

const PublicBookshelf = model('PublicBookshelf', publicBookshelfSchema);




module.exports = {PublicBookshelf: PublicBookshelf, PublicShelf: PublicShelf};
