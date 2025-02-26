import React from 'react'

function Header() {
  return (
    <div className='fixed top-5 w-full z-50'>
        <div className='flex flex-row justify-between items-center w-[80%] max-w-[1400px] mx-auto border border-gray-700 px-[20px] py-[10px] rounded-3xl text-white bg-black/20 backdrop-blur-lg'>
            <div>
                <h1 className='text-[30px]'> <i className="bi bi-code-slash mr-3"></i> Diego Espinosa </h1>
            </div>
            <div className='flex space-x-10'>  
                <p className='text-[18px] text-white hover:text-primary font-light'> Home </p>
                <p className='text-[18px] text-white hover:text-primary font-light'> Education </p>
                <p className='text-[18px] text-white hover:text-primary font-light'> Experience </p>
                <p className='text-[18px] text-white hover:text-primary font-light'> Contact </p>
            </div>
            <div>   
                <button className='bg-primary px-5 py-1 rounded-lg font-semibold text-[15px]'> Contact Me</button>
            </div>
        </div>
    </div>
  )
}

export default Header