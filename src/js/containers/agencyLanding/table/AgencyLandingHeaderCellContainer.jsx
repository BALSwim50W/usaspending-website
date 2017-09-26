/**
 * AgencyLandingHeaderCellContainer.jsx
 * Created by Lizzie Salita 7/11/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// just import the relevant action(s)
import { setAgenciesOrder } from 'redux/actions/agencyLanding/agencyLandingActions';

import ResultsTableHeaderCell from 'components/search/table/cells/ResultsTableHeaderCell';

// combine the action functions into an object for the react-redux bindings
const actions = {
    setAgenciesOrder
};

const propTypes = {
    setAgenciesOrder: PropTypes.func,
    order: PropTypes.object,
    displayName: PropTypes.string,
    defaultDirection: PropTypes.string,
    columnName: PropTypes.string,
    isLast: PropTypes.bool
};

class AgencyLandingHeaderCellContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setAgenciesOrder = this.setAgenciesOrder.bind(this);
    }

    setAgenciesOrder(field, direction) {
        this.props.setAgenciesOrder({
            field,
            direction
        });
    }

    render() {
        return (
            <ResultsTableHeaderCell
                label={this.props.displayName}
                defaultDirection={this.props.defaultDirection}
                column={this.props.columnName}
                isLast={this.props.isLast}
                order={this.props.order}
                setSearchOrder={this.setAgenciesOrder} />
        );
    }
}

AgencyLandingHeaderCellContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        order: state.agencyLanding.agenciesOrder
    }),
    (dispatch) => bindActionCreators(actions, dispatch)
)(AgencyLandingHeaderCellContainer);
