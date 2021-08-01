import React, {useEffect, useState} from 'react';
import * as apiSearches from "../Services/api.services"



function SearchBooks(props){
    const [listBooks, setListBooks] = useState([])
    const [loading, setLoading] = useState(false);


    
    useEffect(()=>{
        setLoading(true);
        apiSearches.searchBookList()
        .then ((res)=> {
            console.log('axios full response data', res)
            const listOfBooks = res.data.docs
            setListBooks(listOfBooks)
        })
        .catch(err => console.log(err))
    }, []);

    useEffect(() => {setLoading(!loading)}, [listBooks])

    if (loading) {
        return <h1>Loading...</h1>
    }

    else {
        return (
            <div>
            <h2>Searched Books</h2>
            {listBooks.map(oneBook =>{
                return(
                    <div key={oneBook.title}>
                        <h4>{oneBook.title}</h4>
{/*                         <Link to={`/books/${bookArray.data.docs._id}`}>{bookArray.data.docs.name}</Link> */}
                    </div>
                )
            })}
        </div>
        )
    }

};

export default SearchBooks;