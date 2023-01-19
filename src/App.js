import { useState, useEffect } from "react";
import styles from "./App.module.css";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  const deleteBtn = (index) => {
    setToDos(toDos.filter((_, todoIndex) => index !== todoIndex));
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (!toDo) {
      return;
    }
    setToDos((currentArray) => [toDo, ...currentArray]);
    setToDo("");
  };

  useEffect(() => {
    toDos.map((item) => item.key);
    console.log(toDos);
  }, [toDos]);

  return (
    <div>
      <h1>My To Dos {toDos.length}</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={toDo}
          placeholder="Write your to do"
        />
        <button>Add To Do</button>
      </form>

      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>
            {item}
            <span key={index} onClick={() => deleteBtn(index)}>
              ❌
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
