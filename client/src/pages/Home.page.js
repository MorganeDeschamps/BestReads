import React from 'react'
import { Link } from 'react-router-dom';
import "../App.css"
import '../components/Navbar/Navbar.css'


function HomePage() {
  return (
    // component for user profile - make sure call props
    <div className="home">
      <div className="home-img-container">
        <img src="https://64.media.tumblr.com/11e061c672d56b817484963145163de9/912682de92279e4a-1a/s640x960/24725567374df17623ffe72b92965a9a711bd229.gifv" alt="" className="img-home"/>
        
        <div className="home-headings">
          <Link to={'/search'} className="tag center">A NOVEL IDEA</Link>
          <p className="quote center">"At least we're not Amazon"</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
