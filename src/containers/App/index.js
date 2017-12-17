import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Activity from "../Activity";
import Pages from "../Pages";

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
        <header className="App-header">
          header
        </header>
        
        <aside>
          <NavLink exact to="/">Activity</NavLink>
          <NavLink exact to="/pages">Pages</NavLink>
        </aside>

        <main>
          <pre>{this.state.data}</pre>
          <Route exact path="/" component={Activity} />
          <Route exact path="/pages" component={Pages} />
        </main>
      </div>
    );
  }
}

export default App;
