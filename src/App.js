import React, { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const [todo, setTodo] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setError(false);
    setTodo(e.target.value);
  };
  const deleteTask = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const handleCheck = (index) => {
    console.log("index", index);
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const handleClick = (e) => {
    if (todo.trim().length <= 0) {
      setError(true);
    } else {
      const newTodo = [{ task: todo, completed: false }, ...todos];
      setTodos(newTodo);
      localStorage.setItem("todos", JSON.stringify(newTodo));
      console.log("hELLO");
    }
  };
  console.log(todos);
  return (
    <main className="max-w-[600px] mx-auto">
      <h1 className="text-7xl font-bold text-[#EBEBEB] text-center">todos</h1>
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
          className="text-[#008C8E]"
        />
      </div>

      <ul className="max-w-full">
        {todos.reverse().map((item, index) => (
          <li className="flex items-center gap-4  border-b py-2 my-4">
            <input
              type="checkbox"
              className="w-8 "
              onChange={() => handleCheck(index)}
            />
            <p
              className={`flex-1 whitespace-wrap  ${
                item.completed && "line-through"
              }`}
            >
              {item.task}
            </p>
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
