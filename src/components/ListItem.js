import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
import Modal from "./Modal";

const ListItem = ({ task, getData }) => {
  //   console.log(tasks);
  const [check, setCheck] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const deleteItem = async () => {
    try {
      const response = await fetch(
        `https://us-central1-back-e8f9a.cloudfunctions.net/api/todos/${task.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheck = () => {
    setCheck(!check);
  };

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon handleCheck={handleCheck} />
        <p
          className="task-title"
          style={
            check || task.progress === 100
              ? { textDecoration: "line-through" }
              : {}
          }
          id={task.id}
        >
          {task.title}
        </p>
      </div>
      <div className="ss">
        <ProgressBar progress={task.progress} />
        <div className="button-container blist">
          <button
            className="edit"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Edit
          </button>
          <button className="delete" onClick={deleteItem}>
            X
          </button>
        </div>
      </div>
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          getData={getData}
          task={task}
        />
      )}
    </li>
  );
};

export default ListItem;
