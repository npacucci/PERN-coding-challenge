import React, {Fragment} from 'react';
import './App.css';

// Components
import ListTodos from "./components/ListTodos/ListTodos";

function App() {
  return (
    <Fragment>
      <div className="container mt-5">
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default App;
