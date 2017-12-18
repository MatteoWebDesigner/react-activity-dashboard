import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import Moment from 'react-moment';
import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';
import values from 'lodash/values';
import Modal from 'react-modal';
import PanelActivityGroup from '../../components/PanelActivityGroup';
import PanelActivity from '../../components/PanelActivity';
import Icon from '../../components/Icon'

import './index.scss';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      receipts: [],
      showModal: false
    }

    this.fetchReceipts.bind(this);
    this.handleCloseModal.bind(this);
  }

  fetchReceipts() {
    return fetch('/api/receipts/')
      .then(res => res.json())
      .then(receipts => {

        let sortChronologicallyRecentFirst = sortBy(receipts, function(receipt) { 
          let momentUnix = moment.unix(receipt.transaction["unix-timestamp"]);
          receipt.date = momentUnix.format("DD MMMM YYYY  hh:mm:ss"); // DEBUG
          return new moment(momentUnix); 
        })
        .reverse()

        let groupByDate = groupBy(sortChronologicallyRecentFirst, function (receipt) {
          return moment.unix(receipt.transaction["unix-timestamp"]).startOf('day').format();
        });

        let collectionGroupByDate = values(groupByDate);

        this.setState({ receipts: collectionGroupByDate });
      })
  }

  handleCloseModal() {
    this.setState({
      showModal: false
    });
  }

  handleOpenModal() {
    this.setState({
      showModal: true
    });
  }

  componentDidMount() {
    this.fetchReceipts();
  }

  renderReceipts(receipt, index) {
    let 
      unixDate = receipt.transaction["unix-timestamp"],
      image = receipt.application && (receipt.application.appearance["bg-logo"] || receipt.application.appearance["bg-img"]);

    return (
      <PanelActivity 
        key={index} 
        unixDate={unixDate}
        image={image}
        handleClick={this.handleOpenModal.bind(this)}
      />
    );
  }

  renderReceiptsGroup(receiptGroup, index) {
    let unixDate = receiptGroup[0].transaction["unix-timestamp"];

    return (
      <div className="m-xs-b-24" key={index}>
        <PanelActivityGroup unixDate={unixDate}>
          {receiptGroup.map(this.renderReceipts.bind(this))}
        </PanelActivityGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <h1 className="Activity_title">Activity</h1>
        <hr/>
        <h2 className="Activity_sub-title">Activity</h2>
        <p>See a record of everyone you have shared details with.</p>

        {this.state.receipts.map(this.renderReceiptsGroup.bind(this))}

        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal.bind(this)}
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
          className="Activity_modal"
          overlayClassName="Activity_modal-overlay"
        >
          <div className="Activity_modal-close" onClick={this.handleCloseModal.bind(this)}>
            {/* I cannot find the icon */}
            {/*<Icon name="?"/>*/}
            x
          </div>
          
          <div>
            <img src=""/>
          </div>
          <div>
            <img src=""/>
            <Icon name="activity_tick"/>
            <h3>Simple Yoti SDK App</h3>

            <p>viewed this information about you</p>
            at <Moment unix format="hh:mm"></Moment> on <Moment unix format="DD MMMM YYYY"></Moment>

            <hr/>

            Given name(s)
            MAX

            Mobile number
            +456464
          </div>
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  
}, dispatch)

export default connect(null, mapDispatchToProps)(Home);