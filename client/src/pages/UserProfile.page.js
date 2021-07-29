import React, {useEffect, useState} from 'react';
import { getLoggedIn, logout } from '../services/auth';
import * as CONSTS from '../utils/consts';
import CreatePrivateShelf from '../components/PrivateShelves/NewDynamicShelf';
import CreatePublicShelf from '../components/PublicShelves/NewDynamicPubShelf';
import PublicBookshelf from '../pages/publicBS/PublicBookShelf.page';
import PrivateBookshelf from '../pages/privateBS/PrivateBookshelf.page';


function UserBookShelves(props){
    const {user, setUser} = props;
    
    const initalState = {username: '', publicBookshelf: {}, privateBookshelf: {}, reviews: []}

    /* const username = user.username
    const publicBookshelf = user.publicBookshelf
    const privateBookshelf = user.privateBookshelf
    const reviews = user.reviews */
    const [username, setUsername] = useState(user.username)
    const [publicBookshelf, setPublicBookshelf] = useState(user.publicBookshelf)
    const [privateBookshelf, setPrivateBookshelf] = useState(user.privateBookshelf)
    const [reviews, setReviews] = useState(user.reviews)
    const [publicShelves, setPublicBS] = useState()
    const [privateShelves, setPrivateBS] = useState()


    useEffect(() => {
        updateUser()
    }, [])

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
                setPublicBookshelf(res.data.user.publicBookshelf)
                setPublicBS(res.data.user.publicBookshelf.shelves)
                setPrivateBS(res.data.user.privateBookshelf.shelves)
			}
		});
    }

    return (
            <div>
                <h2>My Bookshelves</h2>
                <h4>Private Bookshelf</h4>
                <PrivateBookshelf privateShelf={privateBookshelf} user={user} updateUser={updateUser}/>
                <CreatePrivateShelf appendToShelf={privateBookshelf} updateUser={updateUser} />
                <br/>
                <h4>Public Bookshelf</h4>
                <PublicBookshelf publicShelf={publicBookshelf} user={user} updateUser={updateUser}/>
                <CreatePublicShelf appendToPubShelf={publicBookshelf} updateUser={updateUser} />
            </div>
    )
};

export default UserBookShelves;





// DISPLAY STATIC SHELVES BY ID (PUBLIC AND PRIVATE)
// should be able to get id from the user profile who has shelves attached to it
/* // PRIVATE = 1 static shelf, option to add dynamic shelves
// PRIVATE: array of ebook ids - starts empty and created on signup - if (staticShelf.length === 0)
return <p>Your Bookshelf is Empty</p>
<img> - something cute/ funny
Button to add books - takes you to search books page

ELSE call the data from the backend - should have been added to the backend when we add it to our array model, map through the data and show the names<p>*/


// to get the shelf info go to find book



    // potentially needs a function  to make this work = if private shelf and either shelf empty do this, if full load and map through, else if public do this etc.
    // may need to call functions to get the indivuidal bookshelves i.e. from the bookshelves services page




// if any public or private bookshelves exist, get data and map through it
// if dynamic bookshelf exists, get data and map through


/* import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {displayUserBookshelves} from '../services/auth'
import CreatePrivateShelf from './Components/PrivateShelves/DynamicShelf';
import books from '../../public/bookImg'

 */
//GET
/* 
function UserBookShelves(props){
    const {userId} = props;
    
    const initalState = {username: '', publicBookshelf: {}, privateBookshelf: {}, reviews: []}
    
    const [userBookshelfState, setUserBookshelfState] = useState(initalState)


    
    useEffect(()=>{
        displayUserBookshelves(userId)
        .then ((userBookshelves)=> setUserBookshelfState(userBookshelves))
        .catch(err => console.log(err))
    }, []);

 */

/*         return (
            <div>
                <h4>Private Bookshelf</h4>
                <CreatePrivateShelf /> */

      {/*           create logic for private shelves and logic for public shelves and call in here 
      pass public and private bookshelves as props*/}
/*                 <h2>Searched Books</h2>
                {listBooks.map(oneBook =>{
                return(
                    <div key={oneBook.title}>
                        <h4>{oneBook.title}</h4> */
{/*                         <Link to={`/books/${bookArray.data.docs._id}`}>{bookArray.data.docs.name}</Link> */}
/*                     </div>
                )
            })}
        </div>
        )

};

export default UserBookShelves; */






// PUBLIC = 3 static shelves, option to add dynamic shelves





// DISPLAY DYNAMIC SHELVES
// drop down form to add new dynamic shelves


/* 
function privateBookshelfStatus() {
    const {staticShelf, dynamicShelves} = req.body.privateBookshelf

    if (staticShelf.length === 0) {
        return (
            <div>
                <p>Your Bookshelf is Empty</p>
                <img src={books} alt="booksImg" />
                <button><Link to="/ebooks/create">Add an ebook</Link></button>
            </div>

            /* this could then needs to have another condition if it's full OR if dynamic shelves exist 

        )}
}

funtion publicBookshelfStatus(){
    const {currentlyReading, wantToRead, read, dynamicShelves} = req.body.publicBookshelf
   
    if (currentlyReading.length === 0 || wantToRead.length === 0 || read.length === 0) {

        return (
            <div>
                <p>Your Bookshelf is Empty</p> {/* need to return dynamically for specific bookshelf }
                <img src={books} alt="booksImg" />
                <button><Link to="/ebooks/create">Add an ebook</Link></button>
            </div>
    )}

} */


// option to change background?