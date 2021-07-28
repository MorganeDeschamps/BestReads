import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Hamburger(){
    return(
        <>
            <div className="hamburger">
                <div className="burger berger1" />
                <div className="burger burger2" />
                <div className="burger burger3" />
            </div>
        </>
    )
}