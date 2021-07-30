import React, { useEffect, useState } from 'react'
import * as CONSTS from '../../utils/consts';
import { getLoggedIn, logout } from '../../services/auth';
import { Link } from 'react-router-dom'
import CreatePrivateShelf from '../../components/PrivateShelves/NewDynamicShelf'
import BookEbook from '../../components/Book/BookEbook'
import { movePrivate } from '../../services/shelves.services'



function PrivateBookShelf(props){
    const {user, setUser} = props;
    
    const initalState = {username: '', publicBookshelf: {}, privateBookshelf: {}, reviews: []}

    /* const username = user.username
    const publicBookshelf = user.publicBookshelf
    const privateBookshelf = user.privateBookshelf
    const reviews = user.reviews */
    const [username, setUsername] = useState(user.username)
    const [privateBookshelf, setPrivateBookshelf] = useState(user.privateBookshelf)
    const [privateShelves, setPrivateBS] = useState()

    function updateUser() {
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
		if (!accessToken) {
		}
		getLoggedIn(accessToken).then((res) => {
			if (!res.data) {
				console.log('RES IN CASE OF FAILURE', res);
			} else {
				//setUser(res.data.user)
        setPrivateBookshelf(res.data.user.privateBookshelf)
        setPrivateBS(res.data.user.privateBookshelf.shelves)
			}
		});
    }
    const [bookshelfState, setState] = useState(privateBookshelf)

    useEffect(() => {
        setState(privateBookshelf)
    }, [privateBookshelf])

    useEffect(() => {
      updateUser()
  }, [])



    return (
      <div className="bookshelf-main-page">
        <div className="bookshelf-name">
          <h1 class="cloud-text">{user.username}'s public bookshelf</h1>
        </div>
        <div className="list-books-title">
          <h1>MyEbooks</h1>
            
          <Link to="/ebook/create">Add an ebook</Link>
              {bookshelfState && bookshelfState.shelves && bookshelfState.shelves.length > 0 && bookshelfState.shelves.map(shelf => {
              return(
                <div key={shelf._id} className="bookshelf">
                  <h3>{shelf.name}</h3>
	                <div className="bookshelf-books">
	                  <ol className="books-grid">
                      {shelf.ebooks && shelf.ebooks.map(eachBook => 
                          <BookEbook book={eachBook} user={props.user} bsType="private" bookshelf={privateBookshelf} shelf={shelf._id} updateUser={updateUser} />
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

export default PrivateBookShelf;
