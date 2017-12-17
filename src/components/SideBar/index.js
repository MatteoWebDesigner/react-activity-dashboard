import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toogleVisibility } from '../../store/actions/sideBar'
import  rxClass from 'classnames';
import Icon from "../Icon"
//import { CSSTransitionGroup } from 'react-transition-group';

import './index.scss';

class SideBar extends Component {
    render() { 
        return (
            <div className={
                    rxClass("SideBar", { "is-open": this.props.sideBar.isOpen })
                }
                onClick={this.props.toogleVisibility}
            >
                <aside className={
                        rxClass("SideBar_bar", { "is-open": this.props.sideBar.isOpen })
                    }
                >
                    <nav className="SideBar_nav">
                        <NavLink 
                            exact to="/" 
                            className="SideBar_nav-link"
                            activeClassName="is-active"
                        >
                            <Icon name="activity"/>
                            Activity
                        </NavLink>
                            
                        <NavLink 
                            exact to="/pages" 
                            className="SideBar_nav-link"
                            activeClassName="is-active"
                        >
                            <Icon name="pages"/>
                            Pages
                        </NavLink>
                    </nav>
                </aside>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sideBar: state.sideBar
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    toogleVisibility,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);