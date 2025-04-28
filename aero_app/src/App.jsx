import React from "react"
import { Route, BrowserRouter, Routes } from "react-router-dom"


import Home from "./components/Home";
import Upload from "./components/Upload";
import User from "./components/User";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <------------------- First page --------------------------> */}
        <Route path="/" element={<Home/>}/>

        {/* <------------------------ User page --------------------------------> */}
        <Route path="/user" element={<User/>}/>

        {/* <------------------------------ Prof page --------------------------------> */}
        <Route path="/upload" element={<Upload/>}/>
        

      </Routes>
    </BrowserRouter>

  )
}

export default App