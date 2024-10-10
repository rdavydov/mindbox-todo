import React, { useState } from "react";
import "./App.css";

type FilterType = "all" | "active" | "completed";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [isExpanded, setIsExpanded] = useState(true);

  const addTodo = (text: string) => {
    if (text.trim()) {
      setTodos([
        ...todos,
        {
          id: todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
          text,
          completed: false,
        },
      ]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeTodos = todos.filter((todo) => !todo.completed);

  return (
    <div className="app-container">
      <h1 className="app-title">todos</h1>
      <div className="todo-container">
        <div className="input-container">
          <button
            className={`toggle-all ${isExpanded ? "expanded" : ""}`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            ❯
          </button>
          <input
            className="todo-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo(inputValue)}
            placeholder="What needs to be done?"
          />
          {inputValue && (
            <button
              className="save-todo-btn"
              onClick={() => addTodo(inputValue)}
            >
              +
            </button>
          )}
        </div>

        {isExpanded && (
          <div className="todos-list">
            {filteredTodos.map((todo) => (
              <div key={todo.id} className="todo-item">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <span
                  className={`todo-text ${todo.completed ? "completed" : ""}`}
                >
                  {todo.text}
                </span>
              </div>
            ))}
          </div>
        )}

        {todos.length > 0 && (
          <div className="todo-footer">
            <span className="items-left">
              {activeTodos.length === 1
                ? "1 item left"
                : `${activeTodos.length} items left`}
            </span>
            <div className="filters">
              <button
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`filter-btn ${filter === "active" ? "active" : ""}`}
                onClick={() => setFilter("active")}
              >
                Active
              </button>
              <button
                className={`filter-btn ${
                  filter === "completed" ? "active" : ""
                }`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
            {todos.some((todo) => todo.completed) && (
              <button className="clear-completed" onClick={clearCompleted}>
                Clear completed
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
