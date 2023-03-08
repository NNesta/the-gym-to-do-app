import React, { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const [todo, setTodo] = useState("");

  const handleChange = (e) => {
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
    setTodos([...todos, { task: todo, completed: false }]);
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  console.log(todos);
  return (
    <main className="max-w-[600px] mx-auto">
      <h1 className="text-7xl font-bold text-[#EBEBEB] text-center">todos</h1>
      <div className="flex items-center justify-between border rounded-full px-4">
        <input
          onChange={handleChange}
          value={todo}
          className="px-4 py-2 focus:outline-none"
          placeholder="add todo..."
        />

        <BsPlusCircleFill
          onClick={() => handleClick()}
          className="text-[#008C8E]"
        />
      </div>

      <ul className="">
        {todos.map((item, index) => (
          <li className="flex items-center gap-4  border py-2 my-2">
            <input type="checkbox" onChange={() => handleCheck(index)} />
            <p className={`flex-1 ${item.completed && "line-through"}`}>
              {item.task}
            </p>
            <MdDelete onClick={() => deleteTask(index)} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
