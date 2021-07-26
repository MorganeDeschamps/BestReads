


export default function SearchResults(props) {

    const {results} = props
    console.log("props: ", results)

/*     props.results.map(eachWork => {
        return(
            <div>{eachWork.name}</div>
    )})
 */

    return(
        <div>
            {results.map(eachDoc => 
                <div key={eachDoc.key}>
                    <a href="/">{eachDoc.title}</a>
                </div>
            )}
        </div>

    )
}