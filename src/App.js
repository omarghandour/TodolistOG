import React from 'react'
import Todo from './pages/Todo'
import M from './components/M'
import { Helmet } from 'react-helmet-async'
// import firebase from './firebase'
const App = () => {
  // React.useEffect(()=>{
  //   const msg=firebase.messaging();
  //   msg.requestPermission().then(()=>{
  //     return msg.getToken();
  //   }).then((data)=>{
  //     console.warn("token",data)
  //   })
  // })

  return (
    <div className='app'>
      <Helmet>
        <title>Todo</title>
        <meta name='application-name' content='OGTodo' />
        <meta name='author' content='Omar Ghandour' />
        <meta name='description' content='OGTodo is a smart and
                            intuitive app that lets you create, edit, and complete tasks
                            with just a few taps.' />
        <meta name='keywords' content='Todo list, Todolist, TodoList, React, Ghandour, List, Todo, tasks' />
      </Helmet>
      <Todo />
      <M />
      {/* <p className='copyright'>©️ Omar Ghandour</p> */}
    </div>
  )
}

export default App