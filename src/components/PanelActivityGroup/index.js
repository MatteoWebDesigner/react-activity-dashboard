import React, { Component } from 'react';
import Moment from 'react-moment';

import './index.scss';

class PanelActivityGroup extends Component {
  constructor(props) {
    super(props)
    //this.state = { receipts: [] }
  }

  renderItems(item, index) {
    return (<div className="PanelActivityGroup_item" key={index}>{item}</div>);
  }

  render() {
    return (
      <div className="PanelActivityGroup">
        <div className="PanelActivityGroup_header">
            <Moment unix format="DD MMMM YYYY">{this.props.unixDate}</Moment>
        </div>
        <div className="PanelActivityGroup_body">
            {this.props.children.map(this.renderItems)}
        </div>
      </div>
    )
  }
}

export default PanelActivityGroup;