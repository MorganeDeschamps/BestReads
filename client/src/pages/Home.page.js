import React from 'react'
import "../App.css"
import Search from '../pages/search/Search.page'

function HomePage() {
  return (
    // component for user profile - make sure call props
    <div className="home">
      <Search />

    </div>
  );
}

export default HomePage;
