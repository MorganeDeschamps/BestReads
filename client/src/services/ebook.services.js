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


//form needs  { title, author, coverUrl, ebookUrl, owner, shelfId}
export function createEbook(ebookDetails) {
    return service.post("/create", ebookDetails)
    .then(successStatus)
    .catch(internalServerError)
}

