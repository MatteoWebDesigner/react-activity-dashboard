import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon';

import './index.scss';

class TopNav extends Component { 
    constructor(props) {
        super(props);

        this.openMenu = this.openMenu.bind(this);
    }

    openMenu() {

    }

    render(props) { 
        return (
            <header className="TopNav">
                <div className="container-fluid navbar navbar-default navbar-fixed-top">
                    <div className="TopNav_layout">
                        <div className="TopNav_menu" onClick={this.openMenu}>
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
                            {/*<img src="" alt="user-profile"/>*/}
                            <Icon name="user_selfie_ph"/>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default TopNav;
