import React, { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";
import logo from "./pic/OGTodo-logos_white.png";

const ListHeader = ({ listName, getData, todayStreak, streak, todayuser }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [showModal, setShowModal] = useState(false);
  const signOut = () => {
    console.log("signout");
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };
  function hanle() {
    window.location = "/";
  }

  return (
    <div className="list-header">
      <img className="logo-lh" src={logo} alt="TodoList Logo" onClick={hanle} />
      <h1 className="date">{listName}</h1>
      <h1 style={{ fontSize: "15px", width: "50px", color: "white" }}>
        {" "}
        {streak} 🔥
      </h1>
      <div className="button-container">
        <button className="create-lh" onClick={() => setShowModal(true)}>
          Add New
        </button>
        <button className="signout" onClick={signOut}>
          Sign Out
        </button>
      </div>
      {showModal && (
        <Modal
          todayuser={todayuser}
          streak={streak}
          mode={"create"}
          setShowModal={setShowModal}
          getData={getData}
          todayStreak={todayStreak}
        />
      )}
    </div>
  );
};

export default ListHeader;
