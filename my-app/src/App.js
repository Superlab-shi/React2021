import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';

import React from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

function App() {
  const name = 'Brad'
  const x = true;
  const [showAddTask, setShowAddTask] = useState (false)
  const [tasks, setTasks] = useState ([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromSever = await fetchTasks()
      setTasks(tasksFromSever)
    }
    getTasks()
  }, [])

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

    const addTask = async (task)=> {
      // const id = Math.floor(Math.random() * 10000) + 1
      // console.log(id)
      // const newTask = {id, ...task}
      // setTasks([...tasks, newTask])

      const res = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task),
      })
  
      const data = await res.json()
  
      setTasks([...tasks, data])

    }

    const deletTask = async (id) => {
      await fetch(`http://localhost:5000/tasks/${id}`,{
        method: 'DELETE'
      })
      setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = async (id) => {
      const taskToToggle = await fetchTask(id)
      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
  
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updTask),
      })
  
      const data = await res.json()
  
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, reminder: data.reminder } : task
        )
      )
    }

  return (
    <Router>
      <div className="container">
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        <h2>Hello {x ? name : 'No'}</h2>
        <Header title={'Hello'} onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />

        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deletTask} onToggle={toggleReminder} /> : ('No tasks to show')}
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

// class App extends React.Component {
//   render() {
//     return <h1>Hello from class</h1>
//   }
// }

export default App;
