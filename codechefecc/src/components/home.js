import React from 'react'
import logo from './CodeChef.png'
import Contactus from './contactus'

export default function Home(){
    return(
        <>
        <div className='grid'>
        <div className='discrip'>    
        <div className='discripShort'>The CODECHEF PESU ECC,</div>
        
         is the official competitive programming club of the PES Electronic city Campus. We are here to help enhance your programing skills along with strengthening your problem solving skills. So start off your coding paylist, put your hood on and hop on!
        </div>
        <div className='herologo'><img src={logo} alt='logo'></img></div>
        
        </div>
        <Contactus/>
        </>
    )
}