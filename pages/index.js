import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Home() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const deleteTodo = (idx) => {
    todos.splice(idx, 1);
    const newTodos = [...todos];
    setTodos(newTodos);
  };

  const markTodo = (idx) => {
    todos[idx].completed = !todos[idx].completed;
    setTodos([...todos]);
  };
  useEffect(() => {
    const todoStr = localStorage.getItem("react-todos");
    if (!todoStr) {
      setTodos([]);
    } else {
      setTodos(JSON.parse(todoStr));
    }
  }, []);
  const [isFirstRender, setIsfirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsfirstRender(false);
      return;
    } else {
      saveTodos();
    }
  }, [todos]);
  const saveTodos = () => {
    const todoStr = JSON.stringify(todos);
    localStorage.setItem("react-todos", todoStr);
  };

  const moveUp = (idx) => {
    if (idx > 0) {
      const newTodos = [...todos];
      const temp = newTodos[idx];
      newTodos[idx] = newTodos[idx - 1];
      newTodos[idx - 1] = temp;
      setTodos(newTodos);
    }
  };

  const moveDown = (idx) => {
    if (idx < todos.length - 1) {
      const newTodos = [...todos];
      const temp = newTodos[idx];
      newTodos[idx] = newTodos[idx + 1];
      newTodos[idx + 1] = temp;
      setTodos(newTodos);
    }
  };

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onChange={(event) => {
            setTodoInput(event.target.value);
          }}
          value={todoInput}
          onKeyUp={(event) => {
            if (event.key !== "Enter") return;
            else {
              if (event.target.value === "") {
                alert("Todo cannot be empty");
              } else {
                const newTodos = [
                  { title: todoInput, completed: false },
                  ...todos,
                ];
                setTodos(newTodos);
                setTodoInput("");
              }
            }
          }}
        />
        {todos.map((todo, i) => (
          <Todo
            title={todo.title}
            completed={todo.completed}
            key={i}
            onMark={() => markTodo(i)}
            onDelete={() => deleteTodo(i)}
            onMoveup={() => moveUp(i)}
            onMovedown={() => moveDown(i)}
          />
        ))}
        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({todos.length}) </span>
          <span className="text-warning">
            Pending ({todos.filter((todo) => !todo.completed).length}){" "}
          </span>
          <span className="text-success">
            Completed ({todos.filter((todo) => todo.completed).length})
          </span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Thatthana 640612088
        </p>
      </div>
    </div>
  );
}
