import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Moment from 'react-moment';
import Modal from 'react-modal';
import Icon from '../../components/Icon'

import { closeModalActivity } from '../../store/actions/modalActivity';

import './index.scss';

class ModalActivity extends Component {

    renderHeader() {
        if (this.props.modal.type === "share") {
            return null;
        }

        return (
            <div 
                className="ModalActivity_header"
                style={ {backgroundColor: this.props.modal.bgColor} }
            >
                { this.props.modal.bgLogo ?
                    <img className="ModalActivity_header-logo" src={this.props.modal.bgLogo} alt="logo"/>
                : "" }
            </div>
        )
        
    }

    renderAttributes(item, index) {
        let 
            name = Object.keys(item),
            value = item[name];

        return (
            <li key={index}>
                <h4 className="ModalActivity_transaction-attributes-title">{name}</h4>
                <p className="ModalActivity_transaction-attributes-value">{value}</p>
            </li>
        )
    }

    render() {
        return (
            <Modal
                isOpen={this.props.modal.isOpen}
                onRequestClose={this.props.closeModalActivity}
                shouldCloseOnOverlayClick={true}
                ariaHideApp={false}
                className="ModalActivity"
                overlayClassName="ModalActivity-overlay"
            >
                <div className="ModalActivity-close" onClick={this.props.closeModalActivity}>
                    {/* I cannot find the icon */}
                    {/*<Icon name="?"/>*/}
                    ✖️
                </div>

                <div className="ModalActivity_shape">
                    {this.renderHeader()}

                    <div className="ModalActivity_content">
                        {
                            this.props.modal.type === "application" ? 
                            (<div className="ModalActivity_user">
                                <img className="ModalActivity_user-picture" src="/assets/elon_musk.jpg" alt="user"/>
                                <div className="ModalActivity_user-icon">
                                    <Icon name="activity_tick"/>
                                </div>
                            </div>) 
                            : "" 
                        }

                        <h3 className="ModalActivity_application-name">{
                            this.props.modal.type === "application" ? this.props.modal.applicationName : "Yoti Shared"
                        }</h3>

                        {
                            this.props.modal.type === "application" ? 
                            (<div>
                                <p>viewed this information about you<br/>
                                at <Moment unix format="hh:mm">{this.props.modal.unixDate}</Moment> on <Moment unix format="DD MMMM YYYY">{this.props.modal.unixDate}</Moment></p>
                            </div>) : ""
                        }
                        
                        <hr/>

                        <div className="ModalActivity_transaction-attributes">
                            <ul>
                                {this.props.modal.attributes.map(this.renderAttributes)}
                            </ul>
                        </div>
                    </div>  
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      modal: state.modalActivity
    }
  }
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    closeModalActivity
  }, dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(ModalActivity);