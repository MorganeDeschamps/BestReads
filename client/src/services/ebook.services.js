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
	baseURL: `${process.env.REACT_APP_SERVER_URL}/ebook`
});


//body needs { title, author, coverUrl, ebookUrl, owner, bookshelfId, shelf} 
export function createEbook(ebookDetails) {
    service.post("/create", ebookDetails)
    .then(successStatus)
    .catch(internalServerError)
}

