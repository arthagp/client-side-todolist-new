import axios from "axios"
const baseUrl = 'http://localhost:8000'

const getAllTodo = async () => {
    try {
        const response = await axios.get(`${baseUrl}/all-todos`)
        return response.data
    } catch (error) {
        throw (new Error(error.response.data.message) || console.log('Something Wrong When Fetching Data'))
    }
}

const createTodo = async (todo) => {
    try {
        const response = await axios.post(`${baseUrl}/create-todo`, { todo })
        return response.data
    } catch (error) {
        throw (new Error(error.response.data.message) || console.log('Something Wrong When Fetching Data'))

    }
}

const updateTodo = async ({todoId, stats}) => {
    try {
        const response = await axios.put(`${baseUrl}/update-todo/${todoId}`, { stats })
        return response.data
    } catch (error) {
        throw (new Error(error.response.data.message) || console.log('Something Wrong When Fetching Data'))
    }
}

const deleteTodo = async (todoId) => {
    try {
        const response = await axios.delete(`${baseUrl}/delete-todo/${todoId}`)
        return response.data
    } catch (error) {
        throw (new Error(error.response.data.message) || console.log('Something Wrong When Fetching Data'))
    }
}

module.exports = { getAllTodo, createTodo, updateTodo, deleteTodo }