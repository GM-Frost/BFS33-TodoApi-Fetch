import { useEffect, useState } from "react";

function TodoList() {
  const [todoItems, setTodoItems] = useState([]);
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task === "") return;

    const newAddedTask = {
      id: todoItems.length + 1,
      title: task,
      completed: false,
    };
    setTodoItems([...todoItems, newAddedTask]);
    setTask("");
  };

  const addNewTask = (e) => {
    setTask(e.target.value);
  };

  const updateList = (index) => {
    let newTodos = todoItems.map((todo, todoIndex) => {
      if (todoIndex === index) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodoItems(newTodos);
  };

  const deleteTask = (index) => {
    const removeTask = [
      ...todoItems.filter((todo, todoIndex) => todoIndex !== index),
    ];
    setTodoItems(removeTask);
  };

  useEffect(() => {
    async function getTodos() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const result = await response.json();
        setTodoItems(result);
      } catch (e) {
        console.log("Error error?");
      }
    }
    getTodos();
  }, []);
  return (
    <>
      <h1>TODO APP</h1>
      <form onSubmit={handleSubmit} className="formTask">
        <input type="text" value={task} onChange={addNewTask} />
        <button>Add Task</button>
      </form>
      <div>
        <ul>
          {todoItems
            .map((todo, index) => (
              <li className="allTask" key={index}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => updateList(index)}
                  className="checkBox"
                />
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "red" : "blue",
                  }}
                >
                  {todo.title}
                </span>
                <div>
                  <span className="close" onClick={() => deleteTask(index)}>
                    &#xd7;
                  </span>
                </div>
              </li>
            ))
            .reverse()}
        </ul>
      </div>
    </>
  );
}
export default TodoList;
