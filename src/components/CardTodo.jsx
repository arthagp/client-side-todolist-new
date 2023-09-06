'use client'
import React, { useEffect, useState } from 'react';
import { createTodo, getAllTodo, updateTodo, deleteTodo} from '@/api/fetch';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';


const CardTodo = () => {
  const [isForm, setIsForm] = useState(false);
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleSaveTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await createTodo(todo);
      if (response) {
        toast.success('Create todo success', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setTodo('');
        setIsForm(false);
        setTodos([...todos, response.data])
        // fetchAllTodo()
      } else {
        toast.error('Check Your Input', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      if (error.message == 'todos is not iterable') {
        window.location.reload()
      }
      console.error(error);
    }
  }

  const handleDelete = async (todoId) => {
    try {
      const response = await deleteTodo(todoId)
      if (response) {
        toast.success('Delete todo success', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        fetchAllTodo()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeCheckBox = async (todoId, event) => {
    try {
      const stats = event.target.checked ? 'Done' : 'Procces';
      const response = await updateTodo({ todoId, stats });
      console.log(response.data)
      if (response) {
        toast.success('Update todo success', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        fetchAllTodo()
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchAllTodo = async () => {
    try {
      const response = await getAllTodo();
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAllTodo();
  }, []);

  const handleCreateBtn = () => {
    setIsForm(true);
  }

  return (
    <div className='shadow-lg rounded-lg w-96'>
      <div className='w-full h-2 bg-purple-500 rounded-lg'></div>
      <h1 className='border-b p-5 font-bold text-2xl'>My Todos</h1>
      <div className='flex flex-col border-b p-5'>
        {todos && todos.length > 0 ? (
          todos.map(todoItem => (
            <div key={todoItem.id} className='flex justify-between items-center'>
              <div className='flex justify-start items-center'>
                <input
                  onChange={() => handleChangeCheckBox(todoItem.id, event)}
                  type="checkbox"
                  checked={todoItem.status === 'Done'}
                />
                <p className={`text-lg font-medium ml-2 ${todoItem.status === 'Done' ? 'line-through' : ''}`}>{todoItem.task_name}</p>
              </div>
              <button
                className='text-red-500 hover:text-red-700'
                onClick={() => handleDelete(todoItem.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : isForm ? null : (
          <p>No todos available.</p>
        )}
        {isForm && (
          <div className='flex justify-start items-center'>
            <form onSubmit={handleSaveTodo}>
              <input type="checkbox" />
              <input
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                type="text"
                className='border-none focus:border-none focus:outline-none pl-2'
              />
            </form>
          </div>
        )}
      </div>
      <div className='flex justify-between items-center p-3 text-sm'>
        <p>Completed</p>
        <button onClick={handleCreateBtn}>+ Add Task</button>
      </div>
    </div>
  )
}

export default CardTodo;
