import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Activity from "../Activity";
import Pages from "../Pages";
import TopNav from "../../components/TopNav";
import SideBar from "../../components/SideBar";

import './index.scss';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { data: "" }
  }

  componentDidMount() {
    fetch('/api/receipts/')
      .then(res => res.json())
      .then(data => {
        this.setState({ data: JSON.stringify(data) });
      })
  }

  render() {
    return (
      <div className="App">
        <TopNav/>

        <div className="App_content">
          <SideBar />

          <main>
            <Route exact path="/" component={Activity} />
            <Route exact path="/pages" component={Pages} />
          </main>
        </div>
        
      </div>
    );
  }
}

export default App;
