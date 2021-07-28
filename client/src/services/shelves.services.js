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

export function saveToPublic(shelf, book) {
	const info = {shelf: shelf, book: book}

	return publicService.put(`addBook`, info)
	.then(successStatus)
	.catch(internalServerError)

}

export function movePublic(info) {
	//const {shelfFrom, shelfTo, book} = req.body
	return publicService.put(`/moveBook`, info)
	.then(successStatus)
	.catch(internalServerError)


}

export function getPublicShelf(shelfId) {
	return publicService
	.get(`/${shelfId}`)
	.then(successStatus)
	.catch(internalServerError)
}


export function newPublicShelf(form) {
	//form needs {name, ebooks, publicBookshelf}
	return publicService
		.post(`/create`, form)
		.then(successStatus)
		.catch(internalServerError);
}

export function editPublicShelf(shelfId, name) {
	return publicService
		.put(`/${shelfId}/edit`, name)
		.then(successStatus)
		.catch(internalServerError);
}







// PRIVATE
export function movePrivate(info) {
	//form needs {shelfFrom, shelfTo, book} 
	return privateService.put(`/moveBook`, info)
	.then(successStatus)
	.catch(internalServerError)
}


export function getPrivateShelf(shelfId) {
	return privateService
	.get(`/${shelfId}`)
	.then(successStatus)
	.catch(internalServerError)
}

export function newPrivateShelf(form) {
	//form needs {name, privateBookshelf}
	return privateService
	.post(`/create`, form)
	.then(successStatus)
	.catch(internalServerError);
}

export function editPrivateShelf(shelfId, name) {
	//form needs {name}
	return privateService
	.put(`/${shelfId}/edit`, name)
	.then(successStatus)
	.catch(internalServerError);
}


