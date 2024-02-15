import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Pages.css";
import logo from "../components/pic/OGTodo-logos_white.png";
// import logo2 from '../components/pic/OGTodo-logos.jpeg'
import { useCookies } from "react-cookie";
import ListItemPre from "../components/ListItemPre";
import M from "../components/M";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [cookies] = useCookies(null);
  const [tasks, setTasks] = useState(null);
  const dbb = process.env.DBB;

  const authToken = cookies.AuthToken;
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const getData = async () => {
    try {
      const response = await fetch(
        `https://ogtodoserverlast.vercel.app/todos/todo@gmail.com`
      );
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  if (authToken) {
    window.location = "/todo";
  }
  // const noti = ()=>{

  //     Notification.requestPermission().then(perm =>{
  //         if(perm === "granted"){
  //             new Notification("Hello friend", {
  //                 body: 'This is a test message',
  //                 data: {
  //                     Hi: "hi"
  //                 },
  //                 icon: logo2
  //             })
  //         }
  //     })
  // }
  return (
    <>
      <Helmet>
        <title>OGTodo</title>
        <meta name="application-name" content="OGTodo" />
        <meta name="author" content="Omar Ghandour" />
        <meta
          name="description"
          content="OGTodo is a smart and
                            intuitive app that lets you create, edit, and complete tasks
                            with just a few taps."
        />
        <meta
          name="keywords"
          content="Todo list, Todolist, TodoList, React, Ghandour, List, Todo, tasks"
        />
      </Helmet>
      <div className="home-con">
        <div className="header-home">
          <img className="logo-lh" src={logo} alt="TodoList Logo" />
          {!authToken ? (
            <NavLink className={"Nav-link"} to={"/todo"}>
              SignUp
            </NavLink>
          ) : (
            <NavLink className={"Nav-link"} to={"/todo"}>
              Todo
            </NavLink>
          )}
        </div>
        <div className="hero-home">
          <div className="content-home">
            <h1>Why OGTodo ?</h1>
            <p>
              Do you often feel overwhelmed by the number of tasks you have to
              do? Do you struggle to keep track of your progress and deadlines?
              Do you wish you had a simple and effective way to organize your
              life?
            </p>
            <p>
              then you need OGTodo, the ultimate app for managing your personal
              and professional projects. OGTodo is a smart and intuitive app
              that lets you create, edit, and complete tasks with just a few
              taps.
            </p>
          </div>
          <div className="licontent-home">
            <h1
              style={{
                fontSize: "15px",
                textAlign: "center",
                color: "#967d67",
              }}
            >
              Todo
            </h1>
            {sortedTasks?.map((task) => (
              <ListItemPre
                key={task.id}
                task={task}
                authToken={authToken}
                getData={getData}
              />
            ))}
          </div>
        </div>
        {/* <button onClick={noti}>Notifcation</button> */}
        <div className="hero2">
          <h3>
            OGTodo is more than just an app. It's a lifestyle. It's a way to
            simplify your life and focus on what matters most. It's a tool to
            help you become more productive, organized, and happy.{" "}
          </h3>
          <h3>
            And you can download OGTodo today and discover the difference it can
            make in your life. OGTodo: the app that does it all.
          </h3>
          {!authToken ? (
            <NavLink className={"Nav-link"} to={"/todo"}>
              SignUp
            </NavLink>
          ) : (
            <NavLink className={"Nav-link"} to={"/todo"}>
              Todo
            </NavLink>
          )}
        </div>
      </div>
      <M />
    </>
  );
};

export default Home;
