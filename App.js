import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState([]);

  // 🔄 Fetch existing todos from backend (MongoDB)
  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodoList(data); // 'data' is an array of { _id, task }
      })
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  // ➕ Add new todo to MongoDB via backend
  const addTask = async () => {
    if (task.trim() !== "") {
      const res = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });

      const newTodo = await res.json();
      setTodoList([...todoList, newTodo]); // Add new task object
      setTask("");
    }
  };

  return (
    <>
      <h1>Todo List:</h1>

      <label>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
      </label>

      <button onClick={addTask}>Add</button>

      <ul>
        {todoList.map((item, index) => (
          <li key={item._id || index}>{item.task}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
