import { Link } from "react-router-dom"
import Default from "../../images/default.jpeg"
import DropdownButton from "../../components/DropdownButton/DropdownButton"

export default function SearchResults(props) {

    const {results} = props
    console.log("props: ", results)

	const {user} = props
    const shelves = user.publicBookshelf.shelves
	console.log('these are the results', results)

	function style(cover) {
		return {
		backgroundImage: `url(${cover})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover"
		}
	}



	function flippityFlop(book) {
		return(
			<div className="flip-card">
				<div className="flip-card-inner">
	  				<div className="book-cover flip-card-front" key={book.coverUrl} style={book.coverUrl ? style(book.coverUrl) : style(Default)} 		alt="book cover"></div>
	  				<div className="flip-card-back">
					  <Link to={{pathname: `/details/${book._id}`, query:{book: book, user: user}}} className="link-tag" style={{position: "absolute", top: 0, right: 0, bottom: 0, left: 0, width: "100%", height: "100%"}}></Link>
	  				</div>
				</div>
			</div>
	)}


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
                        <div key={eachDoc._id} className="book">
	                        <div className="book-top">
	                        { flippityFlop(eachDoc) }
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