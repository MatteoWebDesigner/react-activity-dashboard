import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Home extends Component {
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
      <div className="container">
        <h1>Activity</h1>
        <h2>Activity</h2>
        <p>See a record of everyone you have shared details with</p>

        <pre>{this.state.data}</pre>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  
}, dispatch)

export default connect(null, mapDispatchToProps)(Home);