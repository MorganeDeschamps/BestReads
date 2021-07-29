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

const service = axios.create({
	baseURL: `${process.env.REACT_APP_SERVER_URL}/reviews`
});


export function createReview(form) {
	const {bookId, owner, comment, rating} = form

    return service.post(`/${bookId}/new-review`, {owner, comment, rating})
    .then(successStatus)
    .catch(internalServerError)

}


export function allReviews(bookId) {

    return service.get(`/${bookId}/reviews`)
    .then(successStatus)
    .catch(internalServerError)

}