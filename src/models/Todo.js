import axios from 'axios'

// we could also put this in an environment variable if we wanted to
const endPoint = `https://sei-111-todo-backend.herokuapp.com/todos`

class TodoModel {
  static all = () => {
    let request = axios.get(endPoint)
    return request
  }

  static create = (todo) => {
    let request = axios.post(endPoint, todo)
    return request
  }

  static delete = (todo) => {
    let request = axios.delete(`${endPoint}/${todo._id}`)
    return request
  }

  static update = (todo) => {
    let request = axios.put(`${endPoint}/${todo._id}`, todo)
    return request
  }
}

export default TodoModel
