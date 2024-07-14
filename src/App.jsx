import Navbar from "./components/navbar";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  }

  const handleAdd = () => {
    let newTodo = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodo);
    setTodo("");
    localStorage.setItem("todos", JSON.stringify(newTodo));
  }

  const handleEdit = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id == id;
    })

    setTodo(todos[index].todo);
    // now delete this todo to make an illusion of update
    setTodos(todos.filter(x => x.id != id));
  }

  const handleDelete = (e, id) => {
    let newTodo = todos.filter(x => x.id != id);
    if (confirm("Are you sure you want to delete this todo!")) {
      setTodos(newTodo);
      localStorage.setItem("todos", JSON.stringify(newTodo));
    } 
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheck = (e) => {
    let todoId = e.target.id;
    // My approach
    // let td = todos.filter(x => x.id === todoId);
    // td.isCompleted = !td.isCompleted;

    // Harry's method
    let index = todos.findIndex(item => {
      return item.id == todoId;
    })
    let newTodo = [...todos];
    newTodo[index].isCompleted = !newTodo[index].isCompleted;
    setTodos(newTodo);
    saveToLS();
  }

  return (
    <>
      <Navbar />
      <div className="container m-0 min-[430px]:p-5 sm:my-5 p-1 sm:rounded-xl bg-violet-100 min-h-[85vh] mx-auto md:w-3/4 lg:w-1/2">
        <h1 className="text-center font-extrabold min-[400px]:text-xl sm:text-2xl xl:text-3xl">iTask - manage your todos at one place</h1>
        <h2 className="min-[410px]:text-lg font-bold">Add a task</h2>
        <div className="addTodo flex justify-between max-sm:flex-col max-sm:gap-1">
          <input onChange={handleChange} value={todo} type="text" name="Enter" id="" className="w-full rounded-lg px-3 py-1" />
          <button onClick={handleAdd} disabled={todo.length < 3} className="bg-violet-500 hover:bg-violet-900 disabled:bg-violet-300 p-2 py-1 mx-5 rounded-md font-bold text-white max-sm:m-0">Save</button>
        </div>

        <input onChange={toggleFinished} type="checkbox" className="text-xs mt-4" id="" checked={showFinished} />
        <label htmlFor="show"> Show Finished</label>
        <div className="h-[.1px] bg-black w-5/6 m-auto my-2"></div>
        <h2 className="min-[400px]:text-lg font-bold">Your Todos</h2>

        <div className="todos">
          {todos.length == 0 && <div className="my-5">No todos to display!</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo bg-[gainsboro] rounded-sm flex justify-between my-2 lg:w-3/4 xl:w-2/3">
              <div className="flex gap-2">
                <input onClick={handleCheck} type="checkbox" checked={item.isCompleted} name="" id={item.id} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="btns flex h-fit">
                <button onClick={(e) => { handleEdit(e, item.id) }} className="bg-violet-500 hover:bg-violet-900 p-2 py-1 mx-2 rounded-md font-bold text-white"><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-violet-500 hover:bg-violet-900 p-2 py-1 mx-1 rounded-md font-bold text-white"><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
