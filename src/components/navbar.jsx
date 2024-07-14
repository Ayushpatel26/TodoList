import React from 'react'

const navbar = () => {
  return (
    <nav className='flex justify-around bg-slate-700 text-white p-2 max-[400px]:justify-between'>
      <h1 className='text-xl font-extrabold'>iTask</h1>
      <ul className='flex items-center gap-5 max-[400px]:gap-2 max-[400px]:text-xs'>
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>About</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Contact</li>
      </ul>
    </nav>
  )
}

export default navbar
