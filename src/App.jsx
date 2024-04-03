import { useEffect, useState } from "react";

import "./App.css";
import { ToDoProvider } from "./Context";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  // setTodos contains all the old/prevoius todo


  // Functionality of methods declared in ToDoContext.js file
  const addTodo = (todo) => {
    setTodos((oldTodos) => [{ id: Date.now(), ...todo }, ...oldTodos]);
  };

  const updateTodo = (id, todo) => {
    setTodos((oldTodos) =>
      oldTodos.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((oldTodos) => oldTodos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((oldTodos) =>
      oldTodos.map((prevTodo) => 
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    // local.storage.getitem ---> output is in string format
    // JSON.parse --> convert string into JSON format

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  // if any changes in todos occur then it will set/update the todo by using localstorage.setItem("todo name",todo in string format)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <ToDoProvider
      value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div className=" w-full" key={todo.id}>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToDoProvider>
  );
}

export default App;
