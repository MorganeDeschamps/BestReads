import axios from 'axios';
let URI = require('urijs');
let URITemplate = require('urijs/src/URITemplate');



export const main = new URITemplate(`https://openlibrary.org/search.json{?q*}`)
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


export function mainSearch(search) {
    const asArray = Object.entries(search);
    const notEmpty = asArray.filter(([key, value]) => value !== "");
    const backToObj = Object.fromEntries(notEmpty);

    axios.get(buildUrl(backToObj))
    .then(result => console.log(result))
    .catch(err => console.log(err))

}





export function getAuthorDetails(key) {
    const url = `/authors/${key}.json`

    return urlbase.get(url)
    .then(result => {return result.data})
    .catch(err => console.log(err))
}



export function getWorks(key) {
    const url = `/authors/${key}/works.json`

    return urlbase.get(url)
    .then(result => {return result.data})
    .catch(err => console.log(err))
}
