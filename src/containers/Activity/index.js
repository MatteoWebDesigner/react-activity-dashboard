import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import Moment from 'react-moment';
import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';
import values from 'lodash/values';
import PanelActivityGroup from '../../components/PanelActivityGroup';
import PanelActivity from '../../components/PanelActivity';

import './index.scss';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { receipts: [] }

    this.fetchReceipts.bind(this);
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

  componentDidMount() {
    this.fetchReceipts();
  }

  renderReceipts(receipt, index) {
    debugger;

    let 
      unixDate = receipt.transaction["unix-timestamp"],
      image = receipt.application && (receipt.application.appearance["bg-logo"] || receipt.application.appearance["bg-img"]);

    return (
      <PanelActivity 
        key={index} 
        unixDate={unixDate}
        image={image}
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
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  
}, dispatch)

export default connect(null, mapDispatchToProps)(Home);