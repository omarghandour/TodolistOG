import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, getData, task, todayStreak, streak }) => {
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
  const [streaks, setStreak] = useState(streak);
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? new Date() : new Date(),
    today: new Date().getDay(),
  });

  const dbb = process.env.DBB;
  const Streak = async () => {
    const data1 = {
      email: email,
      streak: streaks,
    };
    try {
      const response = await fetch(`http://localhost:5000/login`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data1),
      });
      if (response.status === 200) {
        console.log("streak!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (todayStreak === true) {
      const dfg = new Date().getDay();

      if (+dfg + +streak !== +streak - 1) {
        setStreak(+streak + 1);
      }
    }
    console.log(streaks);
  }, [streak, streaks, todayStreak]);
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
        Streak();
        if (data.date === today) {
          setStreak(streak + 1);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  Streak();

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
