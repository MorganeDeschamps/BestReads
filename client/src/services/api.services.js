import axios from 'axios';


const urlbase = axios.create({
    baseURL: `https://openlibrary.org`,
})

export function searchBookList() {
    return urlbase.get("/search.json?title=harry+potter+stone&language=eng")
    .then(result => {
        console.log("result is...", result)
        return result
    })
    .catch(err => console.log(err))
}