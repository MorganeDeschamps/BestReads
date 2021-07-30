import React, {useEffect, useState} from 'react';
import { getLoggedIn, logout } from '../../services/auth';
import * as CONSTS from '../../utils/consts';
import BookEbook from '../../components/Book/BookEbook';
import "./Bookshelves.css"


function PublicBookShelf(props){
    const {user, setUser} = props;
    
    const initalState = {username: '', publicBookshelf: {}, privateBookshelf: {}, reviews: []}

    const [username, setUsername] = useState(user.username)
    const [publicBookshelf, setPublicBookshelf] = useState(user.publicBookshelf)
    const [publicShelves, setPublicBS] = useState()

    function updateUser() {
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
		if (!accessToken) {
		}
		getLoggedIn(accessToken).then((res) => {
			if (!res.data) {
				console.log('RES IN CASE OF FAILURE', res);
			} else {
          setPublicBookshelf(res.data.user.publicBookshelf)
          setPublicBS(res.data.user.publicBookshelf.shelves)
			}
		});
    }


    console.log(publicBookshelf)


    const [bookshelfState, setState] = useState(publicBookshelf)

    useEffect(() => {
        setState(publicBookshelf)
    }, [publicBookshelf])

    useEffect(() => {
      updateUser()
  }, [])



    return (
            <div className="bookshelf-main-page">
                            <div className="bookshelf-name">
                  <h1 class="cloud-text">{user.username}'s public bookshelf</h1>
                </div>
                <div className="list-books-shelf">
                  {bookshelfState && bookshelfState.shelves && bookshelfState.shelves.length > 0 && bookshelfState.shelves.map(shelf => {
              
                  return(
                      <div key={shelf._id} className="bookshelf">
                        <h3 className="cloud-title">{shelf.name}</h3>
	                      <div className="bookshelf-books">
	                  
                          <ol className="books-grid">
                            
                            {shelf.books && shelf.books.map(eachBook => 
                            <BookEbook book={eachBook} user={props.user} bsType="public" updateUser={updateUser} bookshelf={publicBookshelf} shelf={shelf._id} />
                            )}
                          
                          </ol>
                        
                        </div>
                      </div>  
                    )
                  })}
                </div>
            </div>
      )

};

export default PublicBookShelf;

