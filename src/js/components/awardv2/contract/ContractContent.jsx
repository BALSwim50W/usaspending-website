/**
 * ContractContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';

import * as Icons from 'components/sharedComponents/icons/Icons';
import AgencyRecipientContent from './AgencyRecipientContent';
import AdditionalInfo from "./AdditionalInfo";
import AwardAmounts from '../visualizations/amounts/AwardAmounts';

const propTypes = {
    selectedAward: PropTypes.object,
    inFlight: PropTypes.bool,
    id: PropTypes.string
};

export default class ContractContent extends React.Component {
    render() {
        // TODO: determine glossary term for link
        return (
            <div className="award award-contract">
                <div className="award__heading">
                    <div className="award__heading-text">{startCase(this.props.selectedAward.typeDescription)}</div>
                    <div className="award__heading-glossary">
                        <a href={`#/award_v2/${this.props.id}/?glossary=contract`}>
                            <Icons.Glossary />
                        </a>
                    </div>
                    <div className="award__heading-id">
                        {this.props.selectedAward.id}
                    </div>
                </div>

                <div className="agency-recipient">
                    <AgencyRecipientContent
                        award={this.props.selectedAward} />
                </div>

                <div className="award__agencyAdditional">
                    <AdditionalInfo
                        award={this.props.selectedAward} />
                </div>

                <hr className="award__divider" />
                <div className="award__row">
                    <AwardAmounts
                        award={this.props.selectedAward} />
                </div>
            </div>
        );
    }
}
ContractContent.propTypes = propTypes;
