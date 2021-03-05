import Todo from './Todo'

const Todos = (props) => {
  // our friend map
  let todos = props.todos.map((todo) => {
    return (
      <Todo
        key={todo._id}
        todo={todo}
        deleteTodo={props.deleteTodo}
        updateTodo={props.updateTodo}
      />
    )
  })

  return <ul>{todos}</ul>
}

export default Todos
