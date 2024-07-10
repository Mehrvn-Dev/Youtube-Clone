import React, { useState } from 'react'
import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'
//اگر ساید بار مقدارش ترو بود کلاس کانتینر اعمال شود در غیر اینصورت لارج کانتینر
const Home = ({sidebar}) => {
  const [category,setCategory] = useState(0);
  return (
    <>
    <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
    <div className={`container ${sidebar?"":'large-container'}`}>
      <div className="welcome">
      <h1>Welcome to Youtube Clone</h1><br />
      <p>Created by <span><a href="https://www.linkedin.com/in/mehrandev/">Mehran</a></span></p><br />
      </div>
      <hr />
      <Feed category={category}/>

    </div>
    </>

  )
}

export default Home