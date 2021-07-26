import * as apiSearches from "../../Services/api.services"
import { useEffect, useState } from 'react';


function Search() {

    const emptySearch = {q:"", title:"", author:"", subject:"", place:"", person:"", language:"", publisher:""}
    const [searchState, setSearch] = useState(emptySearch)
    const [toggle, setToggle] = useState(false)


    function handleChange(event) {
        const {name, value} = event.target
        setSearch({...searchState, [name]: value})
    }



    function handleSubmit(event) {
        event.preventDefault()
        apiSearches.find(searchState)
    }


  return (
    <div className="search-page">
      <form onSubmit={handleSubmit}>
        <label htmlFor="main">Search: </label>
        <input type="text" onChange={handleChange} name="q" value={searchState.q} />
        <button type="submit">Search</button>
      </form>

        <br />
      <a href="#" onClick={e => setToggle(!toggle)} > Advanced search</a>
      <br />
      <br />
      <br />


      {(toggle) && <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title: </label><br />
            <input type="text" onChange={handleChange} name="title" value={searchState.title} /><br /><br />
            <label htmlFor="title">Author: </label><br />
            <input type="text" onChange={handleChange} name="author" value={searchState.author} /><br /><br />
            <label htmlFor="title">Subject: </label><br />
            <input type="text" onChange={handleChange} name="subject" value={searchState.subject} /><br /><br />
            <label htmlFor="title">Place: </label><br />
            <input type="text" onChange={handleChange} name="place" value={searchState.place} /><br /><br />
            <label htmlFor="title">Person: </label><br />
            <input type="text" onChange={handleChange} name="person" value={searchState.person} /><br /><br />
            <label htmlFor="title">Language: </label><br />
            <input type="text" onChange={handleChange} name="language" value={searchState.language} /><br /><br />
            <label htmlFor="title">Publisher: </label><br />
            <input type="text" onChange={handleChange} name="publisher" value={searchState.publisher} /><br /><br />
            <button type="submit">Search</button>
          </form>
      </div> }

      </div>
  );
}

export default Search;


