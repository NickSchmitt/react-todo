import { useState, useEffect } from 'react'
import TodoModel from '../models/Todo'
import Todos from '../components/Todos'
import CreateTodoForm from '../components/CreateTodoForm'

function TodosContainer() {
  const [todos, setTodos] = useState([])
  const [todoCount, setTodoCount] = useState(0)

  useEffect(() => {
    fetchData()
  }, [])

  const createTodo = async (todo) => {
    let newTodo = {
      body: todo,
      completed: false,
    }
    console.log('in create function')
    // dealing with our api - going to take time
    const anotherTodo = await TodoModel.create(newTodo)
    let newTodos = [...todos, anotherTodo.data]
    setTodos(newTodos)
    setTodoCount(todoCount + 1)
  }

  const fetchData = async () => {
    const res = await TodoModel.all()
    setTodos(res.data)
    setTodoCount(res.data.filter((todo) => todo.completed === false).length)
  }

  const deleteTodo = async (todo) => {
    let res = await TodoModel.delete(todo)
    let tempTodos = todos.filter(function (todo) {
      return todo._id !== res.data._id
    })
    setTodos(tempTodos)
  }

  const updateTodo = async (todo) => {
    //little find helper
    const isUpdatedTodo = (t) => {
      // return the first todo with the right id
      return t._id === todo._id
    }

    let result = await TodoModel.update(todo)
    let todosNow = [...todos]
    todosNow.find(isUpdatedTodo).body = todo.body
    setTodos(todosNow)
  }

  return (
    <div className='todosComponent'>
      <CreateTodoForm createTodo={createTodo} />
      <Todos todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </div>
  )
}

export default TodosContainer
