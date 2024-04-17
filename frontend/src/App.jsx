import { Suspense } from "react"
import React from 'react'
import Home from "./components/Home"
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Signup from "./pages/Signup"
import Signin from "./pages/SIgin"
import Dashboard from "./pages/Dashboard"
import Send from "./pages/Send"

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
            <Route path="/" element={<Signup />}/>
            <Route path="/Signin" element={<Signin />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/send" element={<Send />}/> 
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
export default App
