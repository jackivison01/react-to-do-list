import { useState } from "react";

function ToDoRow({ toDoText }) {
  return (
    <div>
      <ToDo text={toDoText}></ToDo>
      <CheckToDo></CheckToDo>
      <DeleteToDo></DeleteToDo>
    </div>
  )
}

function ToDo({ text }) {
  return (
    <div>{text}</div>
  )
}

function CheckToDo() {
  return (
    <Button value={"Tick"}></Button>
  )
}

function DeleteToDo() {
  return (
    <Button value={"Bin"}></Button>
  )
}

function EntryRow({ onAddToDoClick, setToDo, currentToDo }) {
  return (
    <div>
      <ToDoEntry setToDo={setToDo}></ToDoEntry>
      <AddTodoButton onAddToDoClick={onAddToDoClick} currentToDo={currentToDo}></AddTodoButton>
    </div>
  )
}

function ToDoEntry({ setToDo }) {
  const handleChange = (event) => {
    setToDo(event.target.value); // Update state with input value
  };

  return (
    <input
      placeholder="Enter todo here:"
      onChange={handleChange}
    ></input>
  );
}

function AddTodoButton({ onAddToDoClick, setToDo, currentToDo }) {
  return (
    <Button value='+' onClick={onAddToDoClick} currentToDo={currentToDo}></Button>
  )
}

function Button({ value, onClick, currentToDo }) {
  const handleClick = () => {
    //setToDo();
    onClick(currentToDo);
  }

  return (
    <button onClick={handleClick}>{value}</button>
  )
}

export default function ToDoList() {
  const [todos, setTodos] = useState([])
  const [currentToDo, setCurrentToDo] = useState("")

  const handleAddToDo = () => {
    const newToDo = {
      id: todos.length + 1,
      task: currentToDo,
      compelte: false,
    };
    setTodos([...todos, newToDo]);
  }

  return (
    <>
      <EntryRow onAddToDoClick={handleAddToDo} setToDo={setCurrentToDo} currentToDo={currentToDo}></EntryRow>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <ToDoRow toDoText={todo.task}></ToDoRow>
          </li>
        ))}
      </ul>
    </>
  );
}