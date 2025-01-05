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

function EntryRow({ onAddToDoClick }) {
  return (
    <div>
      <ToDoEntry></ToDoEntry>
      <AddTodoButton onAddToDoClick={onAddToDoClick}></AddTodoButton>
    </div>
  )
}

function ToDoEntry({ }) {
  return (
    <input placeholder="Enter todo here:"></input>
  )
}

function AddTodoButton({ onAddToDoClick }) {
  return (
    <Button value='+' onClick={onAddToDoClick}></Button>
  )
}

function Button({ value, onClick }) {
  const handleClick = () => {
    onClick(value)
  }

  return (
    <button onClick={handleClick}>{value}</button>
  )
}

export default function ToDoList() {
  const [todos, setTodos] = useState([])
  const [currentToDo, setCurrentToDo] = useState("")

  const handleAddToDo = (task) => {
    const newToDo = {
      id: todos.length + 1,
      task: task,
      compelte: false,
    };
    setTodos([...todos, newToDo]);
  }

  return (
    <>
      <EntryRow onAddToDoClick={handleAddToDo}></EntryRow>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <ToDoRow text={todo.task}></ToDoRow>
          </li>
        ))}
      </ul>
    </>
  );
}