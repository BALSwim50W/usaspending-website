/**
 * AgencyList.jsx
 * Created by Emily Gullo 12/23/2016
 **/

import React, { PropTypes } from 'react';
import _ from 'lodash';

import Typeahead from 'components/sharedComponents/Typeahead';
import TypeaheadWarning from 'components/sharedComponents/TypeaheadWarning';
import SelectedAgencies from './SelectedAgencies';

const propTypes = {
    autocompleteAwardingAgencies: PropTypes.array,
    autocompleteFundingAgencies: PropTypes.array,
    onSelect: PropTypes.func,
    customClass: PropTypes.string,
    keyValue: PropTypes.string,
    internalValue: PropTypes.string,
    formatter: React.PropTypes.func,
    tabIndex: PropTypes.number,
    handleTextInput: PropTypes.func,
    isRequired: PropTypes.bool,
    agencyType: PropTypes.string,
    checkValidity: PropTypes.func
};

const defaultProps = {
    customClass: '',
    formatter: null,
    keyValue: 'agency',
    internalValue: 'agency_name',
    tabIndex: null,
    isRequired: false,
    errorHeader: '',
    errorMessage: ''
};

export default class AgencyList extends Typeahead {
    constructor(props) {
        super(props);

        this.state = {
            showWarning: false,
            errorMessage: null,
            errorHeader: null
        };

        this.timeout = null;
    }

    loadValues() {
        const awardingValuesList = [];
        const fundingValuesList = [];
        if (this.props.autocompleteAwardingAgencies.length > 0) {
            this.props.autocompleteAwardingAgencies.forEach((item) => {
                awardingValuesList.push(item);
                const key =
                `<b>${item}</b>`;
                this.dataDictionary[key] = item;
            });
        }
        if (this.props.autocompleteFundingAgencies.length > 0) {
            this.props.autocompleteFundingAgencies.forEach((item) => {
                fundingValuesList.push(item);
                const key =
                `<b>${item}</b>`;
                this.dataDictionary[key] = item;
            });
        }

        if (this.props.agencyType === "Awarding") {
            this.typeahead.list = awardingValuesList;
        }
        else {
            this.typeahead.list = fundingValuesList;
        }

        this.typeahead.replace = () => {
            this.typeahead.input.value = "";
        };
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.autocompleteAwardingAgencies,
            this.props.autocompleteAwardingAgencies) ||
            !_.isEqual(prevProps.autocompleteFundingAgencies,
                this.props.autocompleteFundingAgencies)) {
            this.loadValues();
        }
    }

    bubbleUpChange() {
        // Force the change up into the parent components
        // Validate the current value is on the autocomplete list
        let selectedAgency = null;
        const isValid = this.isValidSelection(this.state.value);
        if (isValid) {
            // Find matching agency object from redux store based on Matched IDs key
            if (this.props.agencyType === "Awarding") {
                for (let i = 0; i < this.props.autocompleteAwardingAgencies.length; i++) {
                    selectedAgency = this.props.autocompleteAwardingAgencies[i];
                    break;
                }
            }
            else {
                for (let i = 0; i < this.props.autocompleteFundingAgencies.length; i++) {
                    selectedAgency = this.props.autocompleteFundingAgencies[i];
                    break;
                }
            }
        }

        // Important - clear internal typeahead state value before passing selection
        this.state.value = '';
        this.props.onSelect(selectedAgency, isValid, this.props.agencyType);
    }

    isValidSelection(input) {
        return {}.hasOwnProperty.call(this.dataDictionary, input);
    }

    checkValidity(input) {
        // Ensure user has typed 2 or more characters
        if (input.length === 1) {
            this.createTimeout(true,
                'You must enter at least 2 characters in the search box.',
                'Agency Error',
                500
            );
        }
        // Clear error when input is cleared or longer than 2 characters
        else {
            this.cancelTimeout();
        }
    }

    createTimeout(showWarning, errorMessage, errorHeader, delay) {
        this.cancelTimeout();

        this.timeout = window.setTimeout(() => {
            this.setState({ showWarning, errorMessage, errorHeader });
        }, delay);
    }

    cancelTimeout() {
        window.clearTimeout(this.timeout);
        this.timeout = null;

        this.setState({
            showWarning: false,
            errorMessage: null,
            errorHeader: null
        });
    }

    onChange(e) {
        const inputValue = e.target.value;

        this.checkValidity(inputValue);
        this.props.handleTextInput(e);
    }

    render() {
        let warning = null;
        if (this.state.showWarning) {
            const errorProps = {};
            if (this.state.errorHeader) {
                errorProps.header = this.state.errorHeader;
            }
            if (this.state.errorMessage) {
                errorProps.description = this.state.errorMessage;
            }

            warning = <TypeaheadWarning {...errorProps} />;
        }

        let selectedAgencies = null;
        if (this.props.selectedAwardingAgencies.size > 0 ||
            this.props.selectedFundingAgencies.size > 0) {
            selectedAgencies = (<SelectedAgencies
                selectedAwardingAgencies={this.props.selectedAwardingAgencies}
                selectedFundingAgencies={this.props.selectedFundingAgencies}
                removeAgency={this.props.removeAgency}
                agencyType={this.props.agencyType} />);
        }

        return (
            <div className="pop-typeahead">
                <div className="usa-da-typeahead">
                    <p>{this.props.agencyType} Agency</p>
                    <input
                        ref={(t) => {
                            this.awesompleteInput = t;
                        }}
                        id={`${this.props.agencyType}-agency-input`}
                        type="text"
                        className={`${this.props.agencyType}-agency-input awesomplete`}
                        placeholder={`${this.props.agencyType} Agency`}
                        onChange={this.onChange.bind(this)} />
                </div>
                {warning}
                {selectedAgencies}
            </div>
        );
    }
}

AgencyList.defaultProps = defaultProps;
AgencyList.propTypes = propTypes;
