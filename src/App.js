import React, { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

function App() {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );

  const [todo, setTodo] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    // This function is called when the user types in the input field
    setError(false);
    setTodo(e.target.value);
  };
  const deleteTask = (index) => {
    // This function is called when the user clicks on the delete icon to delete a todo item
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const handleCheck = (index) => {
    // This function is called when the user clicks on the checkbox to mark a todo item as completed
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };
  const handleClick = (e) => {
    //This function is called when the user clicks on the plus icon to add a new todo item
    if (todo.trim().length <= 0) {
      setError(true);
    } else {
      const newTodo = [{ task: todo, completed: false }, ...todos];
      setTodos(newTodo);
      localStorage.setItem("todos", JSON.stringify(newTodo));
    }
  };
  return (
    <main className="max-w-5xl mx-auto">
      <h1 className="text-7xl max font-bold text-current-900 text-center">
        todos
      </h1>
      <div
        className={`flex items-center justify-between shadow-3xl m-4 rounded-full px-4 ${
          error && "border-red-500 border"
        }`}
      >
        <input
          onChange={handleChange}
          value={todo}
          className="px-4 py-2 focus:outline-none flex-1"
          placeholder="add todo..."
        />

        <BsPlusCircleFill
          onClick={() => handleClick()}
          className="text-current-500"
        />
      </div>

      <ul className="">
        {todos.map((item, index) => (
          <li className="flex items-center gap-4  border-b py-2 my-4">
            <input
              type="checkbox"
              className="w-8 "
              checked={item.completed}
              onChange={() => handleCheck(index)}
            />
            <div className={`flex-1 ${item.completed && "line-through"}`}>
              <p className="text-lg break-all">{item.task}</p>
            </div>
            <div
              onClick={() => deleteTask(index)}
              className="p-2 rounded-full cursor-pointer hover:bg-gray-200"
            >
              <MdDelete size={20} className="text-red-500" />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
