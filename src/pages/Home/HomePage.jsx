import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export const HomePage = () => {
  const [taskInput, setTaskInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [tasks, setTasks] = useState([]);

  const categories = ['General', 'Work', 'Personal', 'Shopping'];

  const handleAddTask = () => {
    if (taskInput.trim() === '') {
      alert('Please enter a task');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskInput,
      category: selectedCategory,
    };

    setTasks([...tasks, newTask]);
    setTaskInput('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Group tasks by category
  const groupedTasks = categories.map((category) => ({
    name: category,
    tasks: tasks.filter((task) => task.category === category),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow p-6 bg-blue-100">
        <div className="max-w-xll mx-auto bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">ToDo App</h1>

          {/* Input & Category */}
          <div className="flex flex-col md:flex-row gap-2 mb-4">
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Enter your task"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddTask}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          {/* Grouped Task List */}
          {groupedTasks.map((group) => (
            <div key={group.name} className="mb-6">
              <h2 className="text-lg font-semibold mb-2 text-gray-800 border-b">{group.name}</h2>
              {group.tasks.length === 0 ? (
                <p className="text-sm text-gray-500">No tasks in this category.</p>
              ) : (
                <ul className="space-y-2">
                  {group.tasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-md border"
                    >
                      <span>{task.title}</span>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};
