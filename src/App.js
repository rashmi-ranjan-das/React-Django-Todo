import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Plan from "./Plan"
import React, { Component } from 'react';
import axios from 'axios'

//AXIOS INSTANCE
const ai = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
})


class App extends Component {
  state = {
    items: [],
    text: ""
  }

  showPlan = () => {
    ai.get('/list/')
    .then((res) => {
      console.log(res.data)
      this.setState({items: res.data})
    })
  }

  addPlan = (d) => {
    if(this.state.text !== ""){
      ai.post('/create/', d)
      .then((res) => {
        this.setState({text: ""})
        window.location.reload()
      })
    }
  }

  handleChange = (e) => {
    this.setState({text: e.target.value});
  }

  handleClick = (e) => {
    let dt = {item: this.state.text}
    this.addPlan(dt)

  }

  handleDelete = (id) => {
    console.log(id);
    ai.delete(`/delete/${id}`)
    .then((res) => {
      this.showPlan();
    }).catch((error) => {
      console.log(error)
    })
  }

  componentDidMount(){
    this.showPlan();
  }

  render() {
    return (
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-sm-6 mx-auto text-white shadow-lg p-3">
            <h2 className="text-center">Today's Plan</h2>
            <div className="row">
                <div className="col-9">
                  <input type="text" value={this.state.text} onChange={this.handleChange} className="form-control" placeholder="Write Plan Here"/>
                </div>
                <div className="col-2">
                 <button onClick={this.handleClick} className="btn btn-warning px-3 font-weight-bold">Add</button>
                </div>
                <div className="container-fluid">
                  <ul className="list-unstyled row m-5">
                    {
                      this.state.items.map((value, i) => {
                        console.log(value.id)
                        return <Plan handleDelete={this.handleDelete} key={value.id} id={value.id} value={value.item} />
                      })
                    }
                  </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;

