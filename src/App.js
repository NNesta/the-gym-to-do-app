import React, { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

function App() {
  const [todoList, setTodoList] = useState(
    () => JSON.parse(localStorage.getItem("todoList")) || []
  );

  const [todoText, setTodoText] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);

  const handleChange = (event) => {
    setInvalidInput(false);
    setTodoText(event.target.value);
  };
  const deleteTask = (taskIndex) => {
    const newTodoList = [...todoList];
    newTodoList.splice(taskIndex, 1);
    setTodoList(newTodoList);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  };
  const handleCheck = (taskIndex) => {
    const newTodoList = [...todoList];
    newTodoList[taskIndex].completed = !newTodoList[taskIndex].completed;
    setTodoList(newTodoList);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  };
  const handleClick = () => {
    if (todoText.trim().length <= 0) {
      setInvalidInput(true);
    } else {
      const newTask = [{ task: todoText, completed: false }, ...todoList];
      setTodoList(newTask);
      setTodoText("");
      localStorage.setItem("todoList", JSON.stringify(newTask));
    }
  };
  return (
    <main className="max-w-5xl mx-auto px-2">
      <h1 className="text-7xl max font-bold text-current-900 text-center">
        todos
      </h1>
      <div
        className={`flex items-center justify-between shadow-3xl m-4 rounded-full px-4 ${
          invalidInput && "border-red-500 border"
        }`}
      >
        <input
          onChange={handleChange}
          value={todoText}
          className="px-4 py-2 focus:outline-none flex-1"
          placeholder="add todoText..."
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleClick();
            }
          }}
        />

        {todoText && (
          <BsPlusCircleFill
            onClick={handleClick}
            className="text-current-500 text-xl hover:scale-110 cursor-pointer"
          />
        )}
      </div>

      <ul>
        {todoList.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-4  border-b py-2 my-4 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleCheck(index)}
            />
            <div
              onClick={() => handleCheck(index)}
              className={`flex-1 ${item.completed && "line-through"}`}
            >
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
