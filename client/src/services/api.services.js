import axios from 'axios';
let URI = require('urijs');
let URITemplate = require('urijs/src/URITemplate');



export const main = new URITemplate(`https://openlibrary.org/search.json{?q*}&limit=50`)
export const subSearch = new URITemplate(`https://openlibrary.org/search/{subSearch}.json{?q*}`)
//works for authors and subjects



const urlbase = axios.create({
    baseURL: `https://openlibrary.org`,
})


function buildUrl(searchOptions) {

    let searchUrl = main.expand({
        q: {...searchOptions}
    })
    console.log("url is:", searchUrl)
    return searchUrl
}


function internalServerError(err) {
	return {
		status: false,
		errorMessage: 'Error while querying the API. Please check your server'
	};
}

function successStatus(res) {
	return {
		//status: true,
		data: res.data
	};
}


export function mainSearch(search) {
    const asArray = Object.entries(search);
    const notEmpty = asArray.filter(([key, value]) => value !== "");
    const backToObj = Object.fromEntries(notEmpty);

    return axios.get(buildUrl(backToObj))
    .then(successStatus)
    .catch(internalServerError)

}

export function searchOneWork(bookID) {

    return axios.get(`https://openlibrary.org/search.json?q=${bookID}&limit=50`)
    .then(successStatus)
    .catch(internalServerError)

}

export function getAuthorDetails(key) {
    const url = `${key}.json`

    return urlbase.get(url)
    .then(successStatus)
    .catch(internalServerError)
}



export function getWorks(key) {
    const url = `${key}/works.json`

    return urlbase.get(url)
    .then(successStatus)
    .catch(internalServerError)
}


export function getOneBook(olid) {
    const url = `https://openlibrary.org/works/${olid}.json`

    return axios.get(url)
    .then(successStatus)
    .catch(err => console.log("Error getting a book from: ", url, " ---Error: ", err))

}
