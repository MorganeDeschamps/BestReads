import { useState, useEffect } from "react";
import {
    EpubView, // Underlaying epub-canvas (wrapper for epub.js iframe)
    EpubViewStyle, // Styles for EpubView, you can pass it to the instance as a style prop for customize it
    ReactReader, // A simple epub-reader with left/right button and chapter navigation
    ReactReaderStyle // Styles for the epub-reader it you need to customize it
  } from "react-reader";
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