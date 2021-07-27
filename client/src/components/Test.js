import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {getOneBook} from "../services/api.services"

function Test(props) {

    const [state, setState] = useState("")
    const [result, setResult] = useState({})

    function handleChange(event) {
        setState(event.target.value)

    }

    function handleSubmit(event) {
        event.preventDefault()
        getOneBook(state).then(res => setResult(res)).catch(err => console.log(err))
    }


    return (
        <div id="test">
            <h1>This is the test page</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" value={state} onChange={handleChange}/>
                <button type="submit">Search</button>
            </form>

            <div>
                <h3>Result : </h3>
                <h4>{result.title}</h4>
            </div>


        </div>
    )
}

export default Test