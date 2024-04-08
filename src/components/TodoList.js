import React, { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    if (editIndex !== null) {
      const newTodos = [...todos];
      newTodos[editIndex].text = inputValue;
      setTodos(newTodos);
      setInputValue("");
      setEditIndex(null);
      setEditValue("");
    } else {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const handleEdit = (index, text) => {
    setEditIndex(index);
    setEditValue(text);
  };

  const handleUpdate = () => {
    const newTodos = [...todos];
    newTodos[editIndex].text = editValue;
    setTodos(newTodos);
    setEditIndex(null);
    setEditValue("");
  };

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleToggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleSort = () => {
    const sortedTodos = [...todos].sort((a, b) => a.text.localeCompare(b.text));
    setTodos(sortedTodos);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Todo List</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="Enter todo"
          value={editIndex !== null ? editValue : inputValue}
          onChange={editIndex !== null ? handleEditChange : handleChange}
          className="todo-input"
        />
        <button type="submit" className="add-button">
          Add
        </button>
      </form>
      <div className="button-container">
        <button onClick={handleSort} className="sort-button">
          Sort Alphabetically
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <span className="todo-text">{todo.text}</span>
            <div>
              <button
                onClick={() => handleToggleComplete(index)}
                className="complete-button"
              >
                {todo.completed ? "Undo" : "Complete"}
              </button>
              {editIndex === index ? (
                <button onClick={handleUpdate} className="update-button">
                  Update
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(index, todo.text)}
                  className="edit-button"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(index)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
