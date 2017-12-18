import React, { Component } from 'react';
import Moment from 'react-moment';
import Icon from '../Icon';

import './index.scss';

class PanelActivity extends Component {
  render() {
    return (
      <div className="PanelActivity" onClick={this.props.handleClick}>
        <Icon name="activity_tick"/>

        <div className="PanelActivity_user-picture">
          { this.props.image ? 
            (<img src={this.props.image} className="PanelActivity_user-picture-image"/>) : 
            (<Icon name="user_selfie_ph"/>) 
          }
        </div>

        Yoti Shared

        <div className="PanelActivity_dates">
          <Moment unix format="hh:mm">{this.props.unixDate}</Moment>
          <Moment unix format="DD MMMM YYYY">{this.props.unixDate}</Moment>
        </div>
      </div>
    )
  }
}

export default PanelActivity;