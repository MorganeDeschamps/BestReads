import React, { useState, useEffect } from 'react';
import { saveToPublic } from "../../services/shelves.services"

export default function DropdownButton (props) {
    const {user} = props
    const {book} = props
    const {search} = props
    const {type} = props

    const shelves = user.publicBookshelf.shelves


/*     function moveShelf() {

        return(
            <div className="book-shelf-changer">
            <select onChange={(event) => action(props.bsType, event.target.value, {shelfFrom: props.shelf, shelfTo: event.target.value, bookId: book._id}).then(res => res.status === true ? updateUser() : console.log(res))}>
            
            <optgroup label="Move to:"></optgroup>
                {shelves.map(shelf => <option value={shelf._id}>{shelf.name}</option>)}
            
            <optgroup label="--------"></optgroup>
            <option value="delete" >Delete</option>
            
            {(props.bsType === "private") && <option value="edit">Edit</option>}
            </select>
            </div>

        )
    }
 */
    function saveTo() {

        return(
            <select onChange={(event) => saveToPublic(event.target.value, book)}>
            <option selected disabled>Save to: </option>
            {shelves.map(shelf => <option value={shelf._id}>{shelf.name}</option>)}
            </select>
        )

    }



    return (
        <div className="book-shelf-changer">
	        <select onChange={(event) => saveToPublic(event.target.value, book)}>
	            <option selected disabled>Save to: </option>
	            {shelves.map(shelf => <option value={shelf._id}>{shelf.name}</option>)}
	            </select>
	    </div>
    )
}