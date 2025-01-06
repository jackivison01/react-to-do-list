import { useState } from "react";

function ToDoRow({ toDoText, id, handleDelete, handleTickTodo, text }) {
  return (
    <div>
      <ToDo text={toDoText}></ToDo>
      <CheckToDo id={id} handleTickTodo={handleTickTodo} text={text}></CheckToDo>
      <DeleteToDo id={id} handleDelete={handleDelete}></DeleteToDo>
    </div>
  )
}

function ToDo({ text }) {
  return (
    <div>{text}</div>
  )
}

function CheckToDo({ id, handleTickTodo, text }) {
  return (
    <Button value={text} onClick={() => handleTickTodo(id)}></Button>
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
      <ToDoEntry setToDo={setToDo} currentToDo={currentToDo} onAddToDoClick={onAddToDoClick}></ToDoEntry>
      <AddTodoButton onAddToDoClick={onAddToDoClick} currentToDo={currentToDo}></AddTodoButton>
    </div>
  )
}

function ToDoEntry({ setToDo, currentToDo, onAddToDoClick }) {
  const handleChange = (event) => {
    setToDo(event.target.value); // Update state with input value
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onAddToDoClick(currentToDo);
    };
  };

  return (
    <input
      placeholder="Enter todo here:"
      onChange={handleChange}
      value={currentToDo}
      onKeyDown={handleKeyPress}
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
  const [todos, setTodos] = useState([]);
  const [currentToDo, setCurrentToDo] = useState("");
  const [newId, setNewId] = useState(1);
  const [doneTodos, setDoneTodos] = useState([]);

  const handleAddToDo = () => {
    if (!currentToDo) return;

    const newToDo = {
      id: newId,
      task: currentToDo,
      complete: false,
    };
    setTodos([...todos, newToDo]);
    setCurrentToDo("");
    setNewId(newId + 1);
  }

  const handleDelete = (id) => {
    if (todos.some(todo => todo.id === id)) {
      // If the todo is in the "todos" list
      setTodos(todos.filter(todo => todo.id !== id));
    } else if (doneTodos.some(todo => todo.id === id)) {
      // If the todo is in the "doneTodos" list
      setDoneTodos(doneTodos.filter(todo => todo.id !== id));
    }
  };

  const handleTickTodo = (id) => {
    const todo = todos.find(item => item.id === id);
    if (!todo) return; // Safety check in case todo is not found

    // Create a new object for immutability
    const newDoneTodo = { ...todo, complete: true };
    setDoneTodos([...doneTodos, newDoneTodo]);
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const handleUntickTodo = (id) => {
    const todo = doneTodos.find(item => item.id === id);
    if (!todo) return; // Safety check in case the todo is not found

    // Create a new object for immutability
    const updatedTodo = { ...todo, complete: false };
    setTodos([...todos, updatedTodo]); // Move it back to the "todos" list
    setDoneTodos(doneTodos.filter(doneTodo => doneTodo.id !== id));
  }

  return (
    <>
      <EntryRow onAddToDoClick={handleAddToDo} setToDo={setCurrentToDo} currentToDo={currentToDo}></EntryRow>
      <div>Todo</div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <ToDoRow
              toDoText={todo.task}
              id={todo.id}
              handleDelete={handleDelete}
              handleTickTodo={handleTickTodo}
              text={"Tick"}
            ></ToDoRow>
          </li>
        ))}
      </ul>
      <div>Done</div>
      <ul>
        {doneTodos.map(todo => (
          <li key={todo.id}>
            <ToDoRow
              toDoText={todo.task}
              id={todo.id}
              handleDelete={handleDelete}
              handleTickTodo={handleUntickTodo}
              text={"Untick"}
            ></ToDoRow>
          </li>
        ))}
      </ul>
    </>
  );
}