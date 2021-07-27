const { Schema, model } = require('mongoose');


//PUBLIC SHELVES

const publicShelfSchema = new Schema(
	{
		name: String,
		books: [String],
		publicBookshelf: { type: Schema.Types.ObjectId, ref: "PublicBookshelf" }
	}
)
const PublicShelf = model('PublicShelf', publicShelfSchema)


//PUBLIC BOOKSHELVES

const publicBookshelfSchema = new Schema(
	{
		name: String,
		currentlyReading: [String],
		wantToRead: [String],
		read: [String,],
		dynamicShelves: [{ type: Schema.Types.ObjectId, ref: "PublicShelf"}],
		owner: { type: Schema.Types.ObjectId, ref: "User" }
	},
	{
		timestamps: true
	}
);

const PublicBookshelf = model('PublicBookshelf', publicBookshelfSchema);




module.exports = {PublicBookshelf: PublicBookshelf, PublicShelf: PublicShelf};
