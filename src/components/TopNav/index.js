import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toogleVisibility } from '../../store/actions/sideBar'
import Icon from '../Icon';

import './index.scss';

class TopNav extends Component { 
    render(props) { 
        return (
            <header className="TopNav container-fluid">
                <div className="TopNav_layout">
                    <div className="TopNav_menu" onClick={this.props.toogleVisibility}>
                        <Icon name="menu"/>
                    </div>

                    <Link to="/" className="TopNav_logo">
                        <Icon name="logo"/>
                    </Link>

                    <div className="TopNav_connected">
                        <span className="TopNav_connected-status">Connected</span>
                        <Icon name="connect-on"/>
                    </div>

                    <div className="TopNav_user-picture">
                        {/*<img src="/assets/elon_musk.jpg" alt="user-profile"/>*/}
                        <Icon name="user_selfie_ph"/>
                    </div>
                </div>
            </header>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    toogleVisibility,
}, dispatch)

export default connect(null, mapDispatchToProps)(TopNav);
