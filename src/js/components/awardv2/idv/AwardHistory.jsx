/**
  * AwardInfo.jsx
  * Created by David Trinh 12/10/2018
  **/

import React from 'react';
import PropTypes from 'prop-types';

import { AwardLoop } from 'components/sharedComponents/icons/Icons';
import TablesSection from './TablesSection';

const propTypes = {
    overview: PropTypes.object
};

export default class AwardHistory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: "transaction"
        };

        this.clickTab = this.clickTab.bind(this);
    }

    clickTab(tab) {
        this.setState({
            activeTab: tab
        });
    }

    render() {
        return (
            <div className="award-history">
                <div className="award-history__title">
                    <span className="award-history__icon">
                        <AwardLoop alt="Award History" />
                    </span>&nbsp;
                    Award History
                </div>
                <hr />
                <TablesSection
                    overview={this.props.overview}
                    clickTab={this.clickTab}
                    activeTab={this.state.activeTab} />
            </div>
        );
    }
}
AwardHistory.propTypes = propTypes;

