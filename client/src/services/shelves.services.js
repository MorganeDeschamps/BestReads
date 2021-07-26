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






// PRIVATE
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