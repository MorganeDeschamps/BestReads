import axios from 'axios';

function internalServerError(err) {
	return {
		status: false,
		errorMessage: 'Internal server error. Please check your server'
	};
}

function successStatus(res) {
	return {
		status: true,
		data: res.data
	};
}

// creates a basic url for every request in this file
const service = axios.create({
	baseURL: `${process.env.REACT_APP_SERVER_URL}/`
});


export function createBookshelves(userId) {

    service.post("/public-bookshelf/create", {name:"", owner: userId})
    .then(successStatus)
    .catch(internalServerError)

    service.post("/private-bookshelf/create", {name:"", owner: userId})
    .then(successStatus)
    .catch(internalServerError)

}


export function getBookshelfById(bookshelfId) {
	service.get(`/public-bookshelf/${bookshelfId}`)
	.then(successStatus)
	.catch(internalServerError);

	service.get(`/private-bookshelf/${bookshelfId}`)
	.then(successStatus)
	.catch(internalServerError);
}

