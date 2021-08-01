import { useState, useEffect } from "react";
import {ReactReader} from "react-reader";
import { getEbookDetails } from "../../services/ebook.services";



function Reader(props){

    const {ebookId} = props.match.params
    console.log("eBookId", ebookId)

    const [ebook, setEbook] = useState("")

    useEffect(() => {getEbookDetails(ebookId).then(res => {
        console.log(res.data);
        setEbook(res.data)
    })}, [])


    return (
        
        <div style={{height: "100vh" }}>
            <div style={{ position: "relative", height: "100%" }}>
              {" "}
              <ReactReader
                url={ebook.ebookUrl}
                title={ebook.title}
                location={"epubcfi(/6/2[cover]!/6)"}
                locationChanged={epubcifi => console.log(epubcifi)}
              />
            </div>
        </div>
    );
    
}

export default Reader