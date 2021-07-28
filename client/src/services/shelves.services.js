import axios from 'axios';




function internalServerError(err) {
	return {
		status: false,
		errorMessage: 'Internal server error. Please check your server'
	};
}

function successStatus(res) {
	console.log("shelves services success!", res)
	return {
		status: true,
		data: res.data
	};
}


// Basic url for every request in this file
const publicService = axios.create({
	baseURL: `${process.env.REACT_APP_SERVER_URL}/public-shelves`,
    withCredentials: true
});


const privateService = axios.create({
	baseURL: `${process.env.REACT_APP_SERVER_URL}/private-shelves`,
    withCredentials: true
});


//PUBLIC

export function saveToPublic(bookshelfId, shelf, book) {
	const info = {bookshelfId: bookshelfId, shelf: shelf, book: book}

	if (shelf === "currentlyReading" || shelf === "wantToRead" || shelf === "read") {
		publicService.put(`/static/addBook`, info)
		.then(successStatus)
		.catch(internalServerError)
	} else {
		publicService.put(`/dynamic/addBook`, info)
		.then(successStatus)
		.catch(internalServerError)
	}
	
}

export function movePublic(info) {
	publicService.put(`/moveBook`, info)

}

export function getPublicShelf(shelfId) {
	return publicService
	.get(`/${shelfId}`)
	.then(successStatus)
	.catch(internalServerError)
}


export function newPublicShelf(form) {
	//form needs {name, ebooks}
	return publicService
		.post(`/create`, form)
		.then(successStatus)
		.catch(internalServerError);
}

export function editPublicShelf(shelfId, form) {
	//form needs {name, ebooks}
	return publicService
		.put(`/${shelfId}/edit`, form)
		.then(successStatus)
		.catch(internalServerError);
}


// PRIVATE
export function getAllPrivateShelves(bookshelfId) {
	return axios
	.get(`${process.env.REACT_APP_SERVER_URL}/private-bookshelf/${bookshelfId}`)
	.then(successStatus)
	.catch(internalServerError)
}

export function getListOfShelves(bsId) {
	let result;
	getAllPrivateShelves(bsId)
	.then(result => {
		console.log("PrivateBookshelf: ", result.data)
		let dynamicShelves = result.data.dynamicShelves;
		let staticShelf = result.data.staticShelves;

		if (dynamicShelves.length === 0 ) {result = staticShelf}
		else { result = [...dynamicShelves, staticShelf]}

	}).catch(err => console.log(err))

	console.log("result: ", result)
	return result;
}


export function getPrivateShelf(shelfId) {
	return privateService
	.get(`/${shelfId}`)
	.then(successStatus)
	.catch(internalServerError)
}


export function newPrivateShelf(form) {
	//form needs {name, ebooks}
	return privateService
		.post(`/create`, form)
		.then(successStatus)
		.catch(internalServerError);
}

export function editPrivateShelf(shelfId, form) {
	//form needs {name, ebooks}
	return privateService
		.put(`/${shelfId}/edit`, form)
		.then(successStatus)
		.catch(internalServerError);
}


export function movePrivate(info) {
	privateService.put(`/moveBook`, info)
	.then(successStatus)
	.catch(internalServerError)
}

