import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css";

export default function TodoList() {
  let [todos, setTodos] = useState([
    { task: "Eat", id: uuidv4(), isDone: false },
  ]);
  let [newTodo, setNewTodo] = useState("");

  let addNewTask = () => {
    if (newTodo.trim() === "") {
      alert("Task cannot be empty");
      return;
    }
    setTodos((prevTodos) => {
      return (todos = [...prevTodos, { task: newTodo, id: uuidv4() }]);
    });
    setNewTodo("");
  };
  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTask = (id) => {
    setTodos((prevTodo) => {
      return prevTodo.filter((todo) => todo.id != id);
    });
  };
  let upperCaseAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        return {
          ...todo,
          task: todo.task.toUpperCase(),
        };
      })
    );
  };

  let upperCase = (id) => {
    setTodos((prevTodo) =>
      prevTodo.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            task: todo.task.toUpperCase(),
          };
        } else {
          return todo;
        }
      })
    );
  };
  let markAsDone = (id) => {
    setTodos((prevTodo) =>
      prevTodo.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        } else {
          return todo;
        }
      })
    );
  };

  let deleteAll = () => {
    setTodos([]);
  };
  return (
    <div className="container">
      <div className="inputAndAdd">
        <input
          type="text"
          value={newTodo}
          onChange={updateTodoValue}
          placeholder="Add new Task"
        />
        <button className="addTask" onClick={addNewTask}>
          Add Task
        </button>
      </div>

      <hr />

      <h2>Todo List 📋</h2>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.isDone ? "line-through" : "none" }}
            >
              {todo.task}
            </span>
            <button onClick={() => deleteTask(todo.id)}>Delete</button>
            <button onClick={() => upperCase(todo.id)}>UpperCase</button>
            <button onClick={() => markAsDone(todo.id)}>
              {todo.isDone ? "Mark as Uncomplete❌" : "Mark as Done✅"}
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <button className="upperAll" onClick={upperCaseAll}>
        UpperCase All
      </button>
      <button className="deleteAll" onClick={deleteAll}>
        Delete All
      </button>
    </div>
  );
}
