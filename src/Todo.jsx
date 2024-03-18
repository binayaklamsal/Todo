import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);

    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index);

    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    if (savedTodo) {
      setTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  const handleEdit = (ind, item) => {
    console.log(ind);
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value };
    });
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, description: value };
    });
  };

  const handleUpdateToDo = () => {
    let newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setTodos(newToDo);
    setCurrentEdit("");
  };

  return (
    <div className="h-screen w-3/4">
      <h1 className="text-lg font-bold">My Todos</h1>

      <div className="bg-slate-300 text-black p-2 w-auto mx-auto mt-3 max-h-80vh overflow-y-auto shadow-md">
        <div className="flex  items-center justify-center border-b border-gray-400 pb-5 mb-5">
          <div className="flex flex-col items-start mr-5">
            <label>Title</label>
            <input
              className="text-black p-2 rounded-md border"
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="flex flex-col items-start mr-5">
            <label>Description</label>
            <input
              className="text-black p-2 rounded-md"
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task description?"
            />
          </div>
          <div className="flex flex-col items-start mr-5">
            <button
              type="button"
              onClick={handleAddTodo}
              className="border border-slate-200 p-2 rounded-md  bg-slate-200"
            >
              Add
            </button>
          </div>
        </div>

        <div className="mb-4">
          <button
            className={`bg-gray-700 text-white border-none rounded-none mt-4 px-4 py-2 cursor-pointer${
              isCompleteScreen === false && "active"
            }`}
            onClick={() => setIsCompleteScreen(false)}
          >
            {" "}
            Todo
          </button>
          <button
            className={`bg-gray-700 text-white border-none rounded-none mt-4 px-4 py-2 cursor-pointer ${
              isCompleteScreen === true && "active"
            }`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="flex flex-col">
          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              if (currentEdit === index) {
                return (
                  <div className="p-4 flex flex-col px-2" key={index}>
                    <input
                      placeholder="Updated Title"
                      onChange={(e) => handleUpdateTitle(e.target.value)}
                      value={currentEditedItem.title}
                    />
                    <textarea
                      placeholder="Updated Title"
                      rows={4}
                      onChange={(e) => handleUpdateDescription(e.target.value)}
                      value={currentEditedItem.description}
                    />
                    <button
                      type="button"
                      onClick={handleUpdateToDo}
                      className="bg-green-500 text-white border-none rounded-none mt-4 px-4 py-2 w-16 cursor-pointer"
                    >
                      Update
                    </button>
                  </div>
                );
              } else {
                return (
                  <div
                    className="bg-slate-500 px-3 rounded-md shadow-md"
                    key={index}
                  >
                    <div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    <div className="flex flex-row items-center gap-3 py-3">
                      <button
                        className="border border-slate-200 p-1 rounded-md  bg-slate-200"
                        onClick={() => handleDeleteTodo(index)}
                        title="Delete?"
                      >
                        Delete
                      </button>
                      <button
                        className="border border-slate-200 p-1 rounded-md  bg-slate-200"
                        onClick={() => handleComplete(index)}
                        title="Complete?"
                      >
                        complete
                      </button>
                      <button
                        className="border border-slate-200 px-5 py-1 rounded-md  bg-slate-200"
                        onClick={() => handleEdit(index, item)}
                        title="Edit?"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                );
              }
            })}

          {isCompleteScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <div
                  className="flex flex-row justify-between items-center bg-slate-500 p-2 rounded-md"
                  key={index}
                >
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed on: {item.completedOn}</small>
                    </p>
                  </div>

                  <div
                    className="border border-slate-200 p-1.5 rounded-md  bg-slate-200 "
                    onClick={() => handleDeleteCompletedTodo(index)}
                    title="Delete?"
                  >
                    Delete
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
