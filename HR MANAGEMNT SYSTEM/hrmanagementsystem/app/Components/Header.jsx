import React from 'react'
import Image from 'next/image';
import logo from '../images/logo.png';
function Header() {
    return (
        <>
        <div className=' bg-purple-900 p-1  flex justify-between '>
            <div className='w-20 '>
                <Image src={logo} alt='Comsats Logo'/>    
            </div>
            <div className='absolute ml-28 mt-2 '>
                <h1 className='navh1 text-2xs sm:text-xl md:text-2xl'>Comsats University Islamabad</h1>
                <h1 className='navh1 text-sm  sm:text-sm  md:text-xl'>Attock Campus</h1>
            </div>
            <div className='sm:visible invisible mt-2 mr-2'>
                <h1 className='navh1 text-2xl'>CUI</h1>
                <p className='navp'>Human Resource Managment System</p>
              
            </div>

        </div>

        </>
    )
}

export default Header