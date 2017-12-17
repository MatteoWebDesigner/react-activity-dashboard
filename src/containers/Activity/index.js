import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Home = props => (
  <div>
    <h1>Activity</h1>
    <p>Welcome Activity!</p>
    <button onClick={() => props.changePage()}>Go to Pages via redux</button>
  </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/pages')
}, dispatch)

export default connect(
  null, 
  mapDispatchToProps
)(Home);