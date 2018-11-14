/**
 * AmountDates.jsx
 * Created by David Trinh 10/12/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import ContractAmounts from './ContractAmounts';
import ContractDates from './ContractDates';

const propTypes = {
    selectedAward: PropTypes.object
};

export default class AmountDates extends React.Component {
    render() {
        return (
            <div className="award__col award-amountdates">
                <ContractAmounts selectedAward={this.props.selectedAward} />
                <ContractDates selectedAward={this.props.selectedAward} />
            </div>
        );
    }
}
AmountDates.propTypes = propTypes;
