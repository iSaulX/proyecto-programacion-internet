import {Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Shopping from "./pages/Shopping"
import Account from "./pages/Account"
import Buy from "./pages/Buy"
import SuccessfulBuy from "./pages/SuccessfulBuy"
import Admins from "./pages/Admins"
export default function App(){
  return (
    <main className='flex flex-col place-items-center bg-[url("./assets/default-gradient.png")] w-full h-screen bg-cover bg-center overflow-y-auto'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<Shopping/>}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="/buy" element={<Buy/>}/>
          <Route path="/success" element={<SuccessfulBuy/>}/>
          <Route path="/admin" element={<Admins/>}/>
        </Routes>
    </main>
  )
}