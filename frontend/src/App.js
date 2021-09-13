import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import { render } from 'react-dom';
import Modal from "./components/Modal";

const todoItems = [
  {
    id:1,
    title: "Go to Market",
    description: "Buy ingredients for dinner",
    completed: true,
  },

  {
    id:2,
    title: "study",
    description: "Study as many materials as possible for django and react",
    completed: false,
  },

  {
    id:3,
    title: "Books",
    description: "Go and find different books on react",
    completed: true,
  },

  {
    id:4,
    title: "Article",
    description: "Write article on how to use djago with react",
    completed: false,
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: todoItems,
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    alert("save" + JSON.stringify(item));
  };

  handleDelete = (item) => {
    alert("delete" + JSON.stringify(item));
  };

  createItem = () => {
    const item={ title: "", description: "", completed: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal })
  }

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={this.state.viewCompleted ? "nav-lin active" : "nav-link"}
          onClick={ () => this.displayCompleted(true)}>
          Complete
        </span>
        <span 
          className={this.state.viewCompleted ? "nav-link": "nav-link active"}
          onClick={ () => this.displayCompleted(false)}>
            Incomplete
          </span>
      </div>
    );
  };


renderItems = () => {
  const { viewCompleted } = this.state;
  const newItems = this.state.todoList.filter((item) => item.completed==viewCompleted);

  return newItems.map((item) => ( 
    <li
      key={item.id}
      className="list-group-item d-flex justify-content-between align-items-center">
        <span
          className={ `todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}>
            {item.title}
            {/* <div>{item.description}</div> */}
          </span>
          <span>
            <button
              className="btn btn-secondary mr-2"
              onClick={() => this.editItem(item)}>
                Edit Todo
              </button>
              <button
              className="btn btn-danger"
              onClick={() => this.handleDelete(item)}>
                Delete Todo
              </button>
          </span>
      </li>
  ));
};


render(){
  return(
    <main className="container">
    <h1 className="text-white-uppercase text-center my-4">Todo App</h1>
    <div className="row">
      <div className="col-md-6 col-sm-10 mx-auto p-0">
        <div className="card p-3">
          <div className="mb-4">
            <button className="btn btn-primary"
              onClick={this.createItem}>
              Add Task
            </button>
          </div>
          {this.renderTabList()}
          <ul className="list-group list-group-flush border-top-0">
            { this.renderItems()}
          </ul>
        </div>
      </div>
    </div>
    {this.state.modal ? (
      <Modal  
        activeItem={this.state.activeItem}
        toggle={this.toggle}
        onSave={this.handleSubmit}/>
    ): null }
  </main>
  );
}
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
