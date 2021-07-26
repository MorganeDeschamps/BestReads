import React from 'react'


function getUrl(result) {
    if(result.event === "success") {
        console.log(result.info.secure_url)
    }
}


export function widgetProfile(event){ 

    window.cloudinary.createUploadWidget({ 
    cloudName: "best-reads", 
    uploadPreset: "bestReads-profilePics", 
    cropping: true
    }, (error, result) => {getUrl(result)}).open()
}


export function widgetCover(event){ 

    window.cloudinary.createUploadWidget({ 
    cloudName: "best-reads", 
    uploadPreset: "bestReads-bookCovers",
    cropping: true
    }, (error, result) => {getUrl(result)}).open()
}



export function widgetEbooks(event) {

    window.cloudinary.createUploadWidget({ 
    cloudName: "best-reads", 
    uploadPreset: "bestReads-ebooks" 
    }, (error, result) => {getUrl(result)}).open()
}
