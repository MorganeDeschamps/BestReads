import Default from "../../images/default.jpeg"
import DropdownButton from "../../components/DropdownButton/DropdownButton"

export default function SearchResults(props) {

    const {results} = props
    console.log("props: ", results)

	const {user} = props
    const shelves = user.publicBookshelf.shelves
	console.log('these are the shelves', user)

	function style(cover) {
		return {
		backgroundImage: `url(${cover})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover"
		}
	}


    function checkThumbnailExists(book) {
		if (book.coverUrl) {
			return (
				<div className="book-cover" key={book.coverUrl} style={style(book.coverUrl)} alt="book cover"></div>
			)
		} else {
            return ( 
				<div className="book-cover" style={style(Default)} alt="book cover"></div>
            )
        }
	}
 

    return(
        <div className="bookshelf">
	        <div className="bookshelf-books">
	            <ol className="books-grid">
                    {results.map(eachDoc => 
                        <div key={eachDoc.id} className="book">
	                        <div className="book-top">
	                        { checkThumbnailExists(eachDoc) }
							<DropdownButton book={eachDoc} user={user} search={true} type={"book"} />
	                        </div>
	                        <div className="book-title" key={eachDoc.title}>{eachDoc.title}</div>
	                        <div className="book-author" key={eachDoc.author}>{eachDoc.author}</div>
                        </div>
                    )}
                </ol>
	        </div>
	    </div>

    )

}