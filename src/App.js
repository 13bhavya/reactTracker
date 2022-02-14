import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { About } from './components/About';
import AddTask from './components/AddTask';
import { Footer } from './components/Footer';
import Header from './components/Header';
import Tasks from './components/Tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskid, setTaskId] = useState(0);

  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const taskfromServer = await fetchTasks();
      setTasks(taskfromServer);
    };

    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    return data;
  };

  const fetchTask = async id => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  const addTask = async task => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
    // console.log("2", tasks);

  };

  const deleteTask = async id => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleReminder = async id => {

    const taskToggle = await fetchTask(id);
    const updateTask = { ...taskToggle, reminder: !taskToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updateTask),
    });

    const data = await res.json();
    setTasks(
      tasks.map(
        task => (task.id === id ? { ...task, reminder: data.reminder } : task)
      )
    );
  };
  return (
    <Router>
      <div className="container">
        <Header
          setShowAddTask={() => setShowAddTask(!showAddTask)}
          showTask={showAddTask}
        />
        <Routes>
          <Route path='/' element={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
            </>} />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
