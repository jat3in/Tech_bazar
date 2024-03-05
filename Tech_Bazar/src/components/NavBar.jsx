import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FaBars } from "react-icons/fa";





export default function NavBar() {
  return (
    <div className='navbar-container container'>
        <nav>
        <div className='title_logo inline-block'>
            <h1>Tech_Bazar</h1>
        </div>
        <div className='inline-block'>
            <ul>
                      <li><a href='#'>About us</a></li>
                      <li><a href='#'>Contact us</a></li>      
                      <li><a href='#'>Products</a></li>

             </ul>

            </div>
            <div className='search-bar-continer inline-block'>
                <input type='search' className='search-input'/>
                <IoSearch className='search-icon'/>
            </div>
            <div className='icons-container inline-block'>
            <FaBars className='s-icons'/>
                <FaShoppingCart className='s-icons'/>
                <IoPerson className='s-icons'/>
                
            </div>
        </nav>
    </div>
  )
}
