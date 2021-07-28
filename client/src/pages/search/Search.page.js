import * as apiSearches from "../../services/api.services"
import { useEffect, useState } from 'react';
import SearchResults from "./SearchResults.page";
import Loading from "../../components/Loading/index"


function Search(props) {

    const emptySearch = {q:"", title:"", author:"", subject:"", place:"", person:"", language:"", publisher:""}
    const [searchState, setSearch] = useState(emptySearch)
    const [toggle, setToggle] = useState(false)
    const [loading, setLoading] = useState(false)

    const [results, setResults] = useState([])

    function handleChange(event) {
        const {name, value} = event.target
        setSearch({...searchState, [name]: value})
    }



    function filter(resultsFromApi) {
      return resultsFromApi.map((eachWork) => {
      let result = {
          author: eachWork.author_name,
          title: eachWork.title,
          _id: eachWork.key.replace("/works/", ""),
          olLink: `https://openlibrary.org${eachWork.key}`
      }

      if (eachWork.cover_edition_key) result.cover = `https://covers.openlibrary.org/b/olid/${eachWork.cover_edition_key}-M.jpg`;

      return result 

      }) 
    }


    function handleSubmit(event) {
        console.log("test")
        event.preventDefault()
        setLoading(true)
        apiSearches.mainSearch(searchState)
        .then(res => {setResults(filter(res.data.docs)) ; setLoading(false)})
        .catch(err => console.log(err))
    }

    //useEffect(() => console.log("results: ", results), [results])


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


      {(toggle) && 
        <div>
          <form onSubmit={e => {handleSubmit(e) ; setToggle(!toggle)}}>
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
        </div> 
      }

{/*       {(results && results.length > 1) && 
        <SearchResults results={results} user={props.user}/>
      }
 */}

        {loading ? <Loading /> : <SearchResults results={results} user={props.user}/> }

      </div>
  );
}

export default Search;


