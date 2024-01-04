import React, { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, getData, task, todayStreak }) => {
  const [cookies] = useCookies(null);
  const editMode = mode === "edit" ? true : false;
  const today = new Date().toLocaleString("en-US", {
    year: "numeric",
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const email = cookies.Email;
  console.log(email);
  const [streak, setStreak] = useState(1);
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? today : today,
  });
  const dbb = process.env.DBB;
  const Streak = async () => {
    try {
      const response = await fetch(`https://localhost5000/login`, {
        method: "PATCH",
        // headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, streak }),
      });
      if (response.status === 200) {
        console.log("streak!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://us-central1-back-e8f9a.cloudfunctions.net/api/todos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.log("worked!");
        setShowModal(false);
        getData();
        if (data.date === today) {
          setStreak(streak + 1);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const editData = async (e) => {
    e.preventDefault();
    try {
      // https://us-central1-back-e8f9a.cloudfunctions.net/api/
      const response = await fetch(`http://localhost:5000/todos/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        setShowModal(false);
        getData();
        Streak();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input
            required
            maxLength={300}
            minLength={1}
            placeholder="Your Task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <p>{data.progress}</p>
          <input
            type="range"
            id="range"
            required
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
