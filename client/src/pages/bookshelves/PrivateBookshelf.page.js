import React, { useEffect, useState } from 'react'
import * as CONSTS from '../../utils/consts';
import { getLoggedIn} from '../../services/auth';
import { Link } from 'react-router-dom'
import CreatePrivateShelf from '../../components/PrivateShelves/NewDynamicShelf'
import BookEbook from '../../components/Book/BookEbook'
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');



function PrivateBookShelf(props){
    const {user} = props;
    
    /* const username = user.username
    const publicBookshelf = user.publicBookshelf
    const privateBookshelf = user.privateBookshelf
    const reviews = user.reviews */
    const [privateBookshelf, setPrivateBookshelf] = useState(user.privateBookshelf)


    //Create shelf: 
    const [newShelfToggle, setNewShelf] = useState(false)

    function openModal() {
      setNewShelf(true);
    }
  
  
    function closeModal() {
      setNewShelf(false);
    }
  



    
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
      <div className="bookshelf-main-page" >
        <div className="bookshelf-name">
          <h1 className="cloud-text">{user.username}'s private bookshelf</h1>
        </div>
        <div className="list-books-title">
          <div className="link-to-create-card">	
              <div className="library-gif">
              </div>
              <div className="product-details">
                <h1>Your own library, always with you.</h1>
                <p>Add your own ebooks, organize your collection in personalized shelves, and read online.</p>

                <div className="buttons-div-bs">
                  <Link className="create-ebook-button" to="/ebook/create">Add an ebook</Link>

                  <Link onClick={openModal} className="create-shelf-button">Create a new shelf</Link>
                  <Modal
                    isOpen={newShelfToggle}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <CreatePrivateShelf bookshelfId={privateBookshelf} toggleHandler={closeModal} updateUser={updateUser} />

                  </Modal>
                </div>
              </div>
            </div>
          </div>
          
              {bookshelfState && bookshelfState.shelves && bookshelfState.shelves.length > 0 && bookshelfState.shelves.map(shelf => {
              return(
                <div key={shelf._id} className="bookshelf">
                <h3 className="cloud-title">{shelf.name}</h3>
	                <div className="bookshelf-books">
	                  <ol className="books-grid">
                      {shelf.ebooks && shelf.ebooks.map(eachBook => 
                          <BookEbook key={eachBook._id} book={eachBook} user={props.user} bsType="private" bookshelf={privateBookshelf} shelf={shelf._id} updateUser={updateUser} />
                      )}
                    </ol>
                  </div>
                </div>  
              )
            })}

          </div>


           
    )
};

export default PrivateBookShelf;
