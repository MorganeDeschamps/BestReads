import * as apiSearches from "../../services/api.services"
import {useState } from 'react';
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

      if (eachWork.cover_edition_key) result.coverUrl = `https://covers.openlibrary.org/b/olid/${eachWork.cover_edition_key}-M.jpg`;

      return result 

      }) 
    }


    function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)
        apiSearches.mainSearch(searchState)
        .then(res => {setResults(filter(res.data.docs)) ; setLoading(false)})
        .catch(err => console.log(err))
    }

    //useEffect(() => console.log("results: ", results), [results])


  return (

    <div className="searchPageMain">
      <div className="searchPage">

        <form onSubmit={handleSubmit} className="searchForm">
            <label htmlFor="searchbar-label"></label>
            <input className="searchbarInput" type="search" pattern=".*\S.*" required onChange={handleChange}  name="q" value={searchState.q} />
            <span className="caret"></span>
        </form> 





{/*         <form onSubmit={handleSubmit} className="searchForm">
          <div className="inputsSearch">
            <label htmlFor="main"></label>
            <input type="text" onChange={handleChange} name="q" value=    {searchState.q} placeholder="Search books, authors or themes" />
          </div>
          <div className="inputsSearch">
            <button type="submit">Search</button>
          </div>
        </form> */}


        <div className="searchFormContainer">
          
          <a nohref="true" onClick={e => setToggle(!toggle)} > Advanced search</a>
          {(toggle) && 
          <div>
            
            <form onSubmit={e => {handleSubmit(e) ; setToggle(!toggle)}} className="advLoginForm">

              <div className="inputsSearch"> 
                <label htmlFor="title">Title </label>
                <input type="text" onChange={handleChange} name="title" value=    {searchState.title} />
              </div>

              <div className="inputsSearch">
                <label htmlFor="title">Author </label>
                <input type="text" onChange={handleChange} name="author"  value=  {searchState.author} />
              </div>

              <div className="inputsSearch">
                <label htmlFor="title">Subject </label>
                <input type="text" onChange={handleChange} name="subject"   value=  {searchState.subject} />
              </div>

              <div className="inputsSearch">
                <label htmlFor="title">Place </label>
                <input type="text" onChange={handleChange} name="place" value=    {searchState.place} />
              </div>

              <div className="inputsSearch">
                <label htmlFor="title">Person </label>
                <input type="text" onChange={handleChange} name="person"  value=  {searchState.person} />
              </div>

              <div className="inputsSearch">
                <label htmlFor="title">Language </label>
                <input type="text" onChange={handleChange} name="language"  value=  {searchState.language} />
              </div>

              <div className="inputsSearch">
                <label htmlFor="title">Publisher </label>
                <input type="text" onChange={handleChange} name="publisher"   value=  {searchState.publisher} />
              </div>

              <div className="inputsSearch">
                <button type="submit">Search</button>
              </div>
            </form>
          </div> 
        }

{/*         {(results && results.length > 1) && 
          <SearchResults results={results} user={props.user}/>
        }
 */}  
          {loading ? <Loading /> : <SearchResults results={results} user= {props.user}/> }

        </div>

      </div>
    </div>

  );
}

export default Search;


