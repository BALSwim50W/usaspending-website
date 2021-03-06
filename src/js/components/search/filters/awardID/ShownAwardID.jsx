/**
 * ShownAwardID.jsx
 * Created by michaelbray on 3/2/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    toggleAwardID: PropTypes.func,
    label: PropTypes.string
};

export default class ShownAwardID extends React.Component {
    render() {
        return (
            <button
                className="shown-filter-button"
                value={this.props.label}
                onClick={this.props.toggleAwardID}
                title="Click to remove filter."
                aria-label={`Applied filter: ${this.props.label}`}>
                <span className="close">
                    <Icons.Close className="usa-da-icon-close" alt="Close icon" />
                </span> {this.props.label}
            </button>
        );
    }
}

ShownAwardID.propTypes = propTypes;
