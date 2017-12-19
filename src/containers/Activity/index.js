import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import moment from 'moment';
import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';
import values from 'lodash/values';

import { openModalActivity } from '../../store/actions/modalActivity';
import { fetchActivityReceipts } from '../../store/actions/activityReceipts';

import ModalActivity from '../../containers/ModalActivity';
import PanelActivityGroup from '../../components/PanelActivityGroup';
import PanelActivity from '../../components/PanelActivity';

import './index.scss';

class Activity extends Component {
  handleSelection(id) {
    this.props.openModalActivity(id, this.props.receipts);
  }

  componentDidMount() {
    this.props.fetchActivityReceipts();
  }

  renderReceipts(receipt, index) {
    let 
      id = receipt.id,
      unixDate = receipt.transaction["unix-timestamp"],
      image = receipt.application && (receipt.application.appearance["bg-logo"] || receipt.application.appearance["bg-img"]),
      type = receipt.type,
      applicationName = receipt.application && receipt.application.name;

    return (
      <PanelActivity 
        key={id} 
        id={id} 
        type={type}
        applicationName={applicationName}
        unixDate={unixDate}
        image={image}
        handleClick={this.handleSelection.bind(this)}
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

        {this.props.receiptsGroupByDay.map(this.renderReceiptsGroup.bind(this))}

        {/* I could use React portal, but it's not worth it yet */}
        <ModalActivity
          handleClose={this.props.closeModalActivity}
        />
      </div>
    )
  }
}

function receiptsCollectionGroupByDay(receipts) {
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

  return collectionGroupByDate
}

const mapStateToProps = (state) => {
  return {
    receipts: state.activityReceipts.collection,
    receiptsGroupByDay: receiptsCollectionGroupByDay(state.activityReceipts.collection)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  openModalActivity,
  fetchActivityReceipts
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Activity);