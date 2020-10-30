import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      _id:'',
      task: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addTask(e) {
    e.preventDefault();
    if(this.state._id){
        fetch(`/api/task/${this.state._id}`,{
            method:'PUT',
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description
            }),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res=> res.json())
        .then(data=>{
           M.toast({html: 'Task Updated'});
            this.setState({_id: '', title:'',description:''});
            this.fetchTask();
        });
    }else{
    fetch("/api/task", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        M.toast({ html: "Task Saved" });
        this.setState({ title: "", description: "" });
        this.fetchTask();
      })
      .catch(err => console.error(err));
    }
  }

  deleteTask(id){
     if(confirm('Are you sure you want to delete it?')){
         fetch(`/api/task/${id}`,{
             method:'DELETE',
             headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             }
         })
         .then(res=>res.json())
         .then(data=>{
             console.log(data);
             M.toast({html:'Task Deleted'});
             this.fetchTask();
         });
     }
  }

  editTask(id){
      fetch(`/api/task/${id}`)
      .then(res=> res.json())
      .then(data=>{
          console.log(data);
          this.setState({
              title: data.title,
              description: data.description,
              _id: data._id
          });
      });
  }
  componentDidMount() {
    this.fetchTask();
  }
  fetchTask() {
    fetch("api/task")
      .then(res => res.json())
      .then(data => {
        this.setState({ task: data });
      });
  }
  render() {
    return (
      <div>
        <nav className="light-blue darken-4">
          <div className="container">
            <div className="nav-wrapper">
              <a className="brand-logo" href="#">
                MERN STACK
              </a>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="title"
                          onChange={this.handleChange}
                          value={this.state.title}
                          type="text"
                          placeholder="Titulo"
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          name="description"
                          onChange={this.handleChange}
                          value={this.state.description}
                          placeholder="Task Description"
                          className="materialize-textarea"
                        >
                          {" "}
                        </textarea>
                      </div>
                    </div>
                    <button type="submit" className="btn light-blue darken-4">
                      Enviar
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table className="">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.task.map(task => {
                    return (
                      <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                          <button onClick={()=> this.deleteTask(task._id)} className="waves-effect waves btn-flat">
                              <i className="material-icons">delete</i>
                          </button>
                          <button onClick={()=> this.editTask(task._id)} style={{margin: '4px'}}className="waves-effect waves btn-flat">
                          <i className="material-icons">edit</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
