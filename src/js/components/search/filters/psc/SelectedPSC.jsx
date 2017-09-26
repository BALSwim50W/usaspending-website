/**
 * SelectedPSC.jsx
 * Created by Emily Gullo 07/14/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ShownValue from 'components/search/filters/otherFilters/ShownValue';

const propTypes = {
    selectedPSC: PropTypes.object,
    removePSC: PropTypes.func
};

export default class SelectedPSC extends React.Component {
    render() {
        const shownPSC = [];
        this.props.selectedPSC.entrySeq().forEach((entry) => {
            const psc = entry[1].product_or_service_code;
            const value = (<ShownValue
                label={_.toString(psc)}
                key={psc}
                removeValue={this.props.removePSC.bind(null, entry[1])} />);
            shownPSC.push(value);
        });

        return (
            <div className="selected-filters">
                {shownPSC}
            </div>
        );
    }
}
SelectedPSC.propTypes = propTypes;
