import React, { useEffect } from "react";
import { useState,useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editTodo,removeTodo } from "../features/todo/todoSlice";
function Todo() {
  const [editInput, setEditInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const editInputRef = useRef(null);
  const todos = useSelector((state) => state.todos);

  const handleEditTodo = (id) => {
    setEditingId(id);
    const todo = todos.find((todo) => todo.id === id);
    setEditInput(todo.text);
  };

  useEffect(() => {
    if (editingId !== null && editInputRef.current) {
      editInputRef.current.focus();
  }
  }, [editingId]);
  
  const handleSaveEdit = (id) => {
    dispatch(editTodo({ id, text: editInput }));
    setEditingId(null);
    setEditInput('');
  };
  const dispatch = useDispatch();
  return (
    <ol type="1">
      {todos.map((todo) => (
        <li style={{ marginBottom: "15px" }} key={todo.id}>
          {/* {todo.text} */}
          {/* <button
            style={{ backgroundColor: 'green', marginLeft: '5px' }}
            onClick={() => dispatch(handleEditTodo(todo.id))}
            >
            Edit
            </button> */}

              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                  />
                  <button
                    style={{ backgroundColor: "green", marginLeft: "15px" }}
                    onClick={() => handleSaveEdit(todo.id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {todo.text}
                  <button
                    style={{ backgroundColor: "grey", marginLeft: "15px" }}
                    onClick={() => handleEditTodo(todo.id)}
                    onChange={(e) => setEditInput(e.target.focus)}
                  >
                    Edit
                  </button>
                </>
              )}
            <button
              style={{ backgroundColor: "red", marginLeft: "5px" }}
              onClick={() => dispatch(removeTodo(todo.id))}
            >
              Delete
            </button>
            
        </li>
      ))}
    </ol>
  );
}

export default Todo;
