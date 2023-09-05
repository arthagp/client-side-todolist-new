import React from 'react'

const CardTodo = () => {
  return (
    <div className='shadow-lg rounded-lg w-96 '>
        <div className='w-full h-2 bg-purple-500 rounded-lg'></div>
        <h1 className='border-b p-5 font-bold text-2xl'>My Todos</h1>
    <div className='flex justify-start items-center border-b p-5'>
        <input type="checkbox" />
        <p className='text-lg font-medium ml-2'>Testing</p>
    </div>
    <div className='flex justify-between items-center p-3 text-sm'>
        <p>Completed 0 of 2</p>
        <button>+ Add Task</button>
    </div>
    </div>
  )
}

export default CardTodo