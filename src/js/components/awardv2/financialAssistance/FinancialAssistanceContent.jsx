/**
 * FinancialAssistanceContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';
import { startCase } from "lodash";

import AwardRecipient from '../contract/AwardRecipient';
import FinancialAmounts from './FinancialAmounts';
import AwardDates from '../shared/AwardDates';

const propTypes = {
    selectedAward: PropTypes.object,
    inFlight: PropTypes.bool,
    id: PropTypes.string,
    jumpToSection: PropTypes.func
};

export default class FinancialAssistanceContent extends React.Component {
    render() {
        // TODO: determine glossary term for link
        return (
            <div className="award award-financial-assistance">
                <div className="award__heading">
                    <div className="award__heading-text">{startCase(this.props.selectedAward.typeDescription)}</div>
                    <div className="award__heading-glossary">
                        <a href={`#/award_v2/${this.props.id}/?glossary=grant`}>
                            <Icons.Glossary />
                        </a>
                    </div>
                    <span className="award__heading-lable">PIID</span>
                    <span className="award__heading-id">{this.props.selectedAward.id}</span>
                </div>
                <hr className="award__divider" />
                <div className="award__row" id="award-overview">
                    <AwardRecipient jumpToSection={this.props.jumpToSection} selectedAward={this.props.selectedAward} />
                    <div className="award__col award-amountdates">
                        <FinancialAmounts selectedAward={this.props.selectedAward} />
                        <AwardDates selectedAward={this.props.selectedAward} />
                    </div>
                </div>

            </div>
        );
    }
}
FinancialAssistanceContent.propTypes = propTypes;
