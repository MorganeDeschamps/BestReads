import { useState } from "react"
import BookEbook from "../../components/Book/BookEbook"
import {getCover} from "../../services/api.services"

/*
PUBLIC
router.put("/moveBook", (req, res) => {
  const {bookshelfId, shelfFrom, shelfTo, booksFrom, booksTo} = req.body
  let result;

PRIVATE
router.put("/moveBook", (req, res) => {
    const {bookshelfId, shelfFrom, shelfTo, booksFrom, booksTo} = req.body
    let result;
  

*/



export default function SearchResults(props) {

    const {results} = props
    console.log("props: ", results)
/* 
    function changeShelf(book, shelf) {
        // check if search results already exist in booklist
        BooksAPI.update(book, shelf).then(response => {
            book.shelf = shelf
            this.setState((state) => ({
                books: this.state.books.filter((b) => b.id !== book.id).concat([ book ])
            }))
        })
    }
 */

    return(
        <div className="bookshelf">
	        <div className="bookshelf-books">
	            <ol className="books-grid">
                    {results.map(eachDoc => 
                        <BookEbook key={eachDoc.id} book={eachDoc} user={props.user}/>
                    )}
                </ol>
	        </div>
	    </div>

    )

}