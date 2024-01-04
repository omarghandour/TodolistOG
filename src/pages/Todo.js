import React, { useEffect, useState } from "react";
import Auth from "../components/Auth";
import ListHeader from "../components/ListHeader";
import ListItem from "../components/ListItem";
import { useCookies } from "react-cookie";

const Todo = () => {
  const [cookies] = useCookies(null);
  const [tasks, setTasks] = useState(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;

  const getData = async () => {
    try {
      // https://us-central1-back-e8f9a.cloudfunctions.net/api
      const response = await fetch(`http://localhost:5000/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);

      //   if (json[0].date === today) {
      //     console.log(true);
      //   }
    } catch (err) {
      console.error(err);
    }
  };
  //   console.log(tasksDates);

  //   const ff = new Date();
  //   console.log(ff);
  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);
  const today = new Date().toLocaleString("en-US", {
    year: "numeric",
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // sort by date
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  //   streak

  const tasksDates = tasks?.map((task) => task.date);
  const todayStreak = tasksDates?.includes(today);

  return (
    <div>
      {!authToken && <Auth />}
      {authToken && (
        <div className="item-body">
          <ListHeader
            todayStreak={todayStreak}
            listName={`${today} `}
            getData={getData}
            tasks={[tasks]}
          />
          <p className="user-email">Welcome back {userEmail}</p>
          <div className="list-item-con">
            <div className="licontent">
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
                <ListItem
                  key={task.id}
                  task={task}
                  authToken={authToken}
                  getData={getData}
                />
              ))}
            </div>
            <div className="qoute">
              <h1
                style={{
                  fontSize: "15px",
                  textAlign: "center",
                  color: "#967d67",
                }}
              >
                Quote
              </h1>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "30px",
                }}
              >
                coming soon
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
