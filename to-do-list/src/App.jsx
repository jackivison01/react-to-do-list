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
    <text>{text}</text>
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

function EntryRow() {
  return (
    <div>
      <ToDoEntry></ToDoEntry>
      <AddTodoButton></AddTodoButton>
    </div>
  )
}

function ToDoEntry({ }) {
  return (
    <input placeholder="Enter todo here:"></input>
  )
}

function AddTodoButton() {
  return (
    <Button value='+'></Button>
  )
}

function Button({ value }) {
  return (
    <button>{value}</button>
  )
}

export default function ToDoList() {
  const [todos, setTodos] = useState([])

  return (
    <>
      <EntryRow></EntryRow>
      <ToDoRow toDoText={"Do the laundry"}></ToDoRow>
      <ToDoRow toDoText={"Make dinner"}></ToDoRow>
    </>
  )
}