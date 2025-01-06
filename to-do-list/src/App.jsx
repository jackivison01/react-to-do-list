import { useState } from "react";

function ToDoRow({ toDoText, id, handleDelete }) {
  return (
    <div>
      <ToDo text={toDoText}></ToDo>
      <CheckToDo></CheckToDo>
      <DeleteToDo id={id} handleDelete={handleDelete}></DeleteToDo>
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

function DeleteToDo({ id, handleDelete }) {
  return (
    <Button value={"Bin"} onClick={() => handleDelete(id)}></Button>
  )
}

function EntryRow({ onAddToDoClick, setToDo, currentToDo }) {
  return (
    <div>
      <ToDoEntry setToDo={setToDo} currentToDo={currentToDo}></ToDoEntry>
      <AddTodoButton onAddToDoClick={onAddToDoClick} currentToDo={currentToDo}></AddTodoButton>
    </div>
  )
}

function ToDoEntry({ setToDo, currentToDo }) {
  const handleChange = (event) => {
    setToDo(event.target.value); // Update state with input value
  };

  return (
    <input
      placeholder="Enter todo here:"
      onChange={handleChange}
      value={currentToDo}
    ></input>
  );
}

function AddTodoButton({ onAddToDoClick, currentToDo }) {
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
  const [newId, setNewId] = useState(1)

  const handleAddToDo = () => {
    const newToDo = {
      id: newId,
      task: currentToDo,
      compelte: false,
    };
    setTodos([...todos, newToDo]);
    setCurrentToDo("");
    setNewId(newId + 1);
  }

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <>
      <EntryRow onAddToDoClick={handleAddToDo} setToDo={setCurrentToDo} currentToDo={currentToDo}></EntryRow>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <ToDoRow
              toDoText={todo.task}
              id={todo.id}
              handleDelete={handleDelete}
            ></ToDoRow>
          </li>
        ))}
      </ul>
    </>
  );
}