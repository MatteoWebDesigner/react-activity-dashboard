import React, { Component } from 'react';
import Moment from 'react-moment';
import Icon from '../Icon';

import './index.scss';

class PanelActivity extends Component {
  handleClick() {
    this.props.handleClick(this.props.id);
  }

  render() {
    return (
      <div className="PanelActivity" onClick={this.handleClick.bind(this)}>
        <Icon name="activity_tick"/>

        <div className="PanelActivity_user-picture">
          { this.props.image ? 
            (<img src={this.props.image} className="PanelActivity_user-picture-image" alt="user"/>) : 
            (<Icon name="user_selfie_ph"/>) 
          }
        </div>

        { (this.props.type === "application" ? this.props.applicationName : "Yoti Shared") }

        <div className="PanelActivity_dates">
          <Moment unix format="hh:mm">{this.props.unixDate}</Moment>
          <Moment unix format="DD MMMM YYYY">{this.props.unixDate}</Moment>
        </div>
      </div>
    )
  }
}

export default PanelActivity;