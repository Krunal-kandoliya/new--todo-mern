import React, { useState } from "react";
import moment from "moment/moment";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { deleteTdo, markTdo, updatetodo } from "../services/apiConstant";

const Todo = ({ todo, setRefres }) => {
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.desc);
  const [isEditing, setIsEditing] = useState(false);

  const handledelete = async () => {
    try {
      const result = await deleteTdo({
        todo_id: todo._id,
      });

      if (result.data.status === 200) {
        setRefres(new Date());
        toast("Deleted");
      } else {
        toast("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast("Something went wrong");
    }
  };

  const handleMark = async () => {
    try {
      const result = await markTdo({
        todo_id: todo._id,
      });

      if (result.data.status === 200) {
        setRefres(new Date());
        toast(result.data.message);
      } else {
        toast("Failed to mark todo");
      }
    } catch (error) {
      console.error("Error marking todo:", error);
      toast("Something went wrong");
    }
  };

  const handleUpdate = async () => {
    try {
      const result = await updatetodo({
        todo_id: todo._id,
        title: editTitle,
        desc: editDesc,
      });

      if (result.data.status === 200) {
        setRefres(new Date());
        toast(result.data.message);
        setIsEditing(false);
      } else {
        toast("Failed to update todo");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      toast("Something went wrong");
    }
  };

  return (
    <>
      <div className="col-sm-3 mx-3 my-2 alert bg-warning">
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            ></textarea>
            <button onClick={handleUpdate} style={{ background: "green" }}>
              Update
            </button>
            <button
              onClick={() => setIsEditing(false)}
              style={{ background: "red" }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <div className="card-header">
              {todo.isCompleted ? "Completed" : "Not Completed"}
            </div>
            <div className="card-body">
              <h4
                className="card-title"
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </h4>
              <p className="card-text">{todo.desc}</p>
              <p className="card-text">{moment(todo.date).fromNow()}</p>
              <div
                className="actionbutton "
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="deleteButton">
                  <button style={{ background: "red" }} onClick={handledelete}>
                    Delete
                  </button>
                </div>
                <div className="marktodo">
                  <button onClick={handleMark} style={{ background: "pink" }}>
                    {todo.isCompleted ? "Mark Uncompleted" : "Mark Completed"}
                  </button>
                </div>
                <div className="updatetodo">
                  <button
                    style={{ background: "red" }}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Todo;
