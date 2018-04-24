/**
 * RecipientContent.jsx
 * Created by Kevin Li 4/20/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { stickyHeaderHeight } from 'components/sharedComponents/stickyHeader/StickyHeader';

import Sidebar from 'components/sharedComponents/sidebar/Sidebar';

const propTypes = {

};

const recipientSections = [
    {
        section: 'overview',
        label: 'Overview'
    }
];
export default class RecipientContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSection: 'overview'
        };
    }

    render() {
        return (
            <div className="recipient">
                <div className="recipient__sidebar">
                    <Sidebar
                        active={this.state.activeSection}
                        pageName="recipient"
                        sections={recipientSections}
                        jumpToSection={this.jumpToSection}
                        stickyHeaderHeight={stickyHeaderHeight} />
                </div>
                <div className="recipient__content">
                    <div className="agency-padded-content overview">
                        
                    </div>
                </div>
            </div>
        );
    }
}

RecipientContent.propTypes = propTypes;
