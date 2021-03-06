/**
 * AwardV2Container-test.js
 * Created by David Trinh 10/6/2018
 **/

import React from 'react';
import { mount, shallow } from 'enzyme';

import { AwardContainer } from 'containers/awardV2/AwardV2Container';

import { mockParams, mockActions } from './mockAward';
import { mockContract, mockLoan, mockIdv } from '../../models/awardsV2/mockAwardApi';

import BaseContract from 'models/v2/awardsV2/BaseContract';
import BaseIdv from 'models/v2/awardsV2/BaseIdv';
import BaseFinancialAssistance from "models/v2/awardsV2/BaseFinancialAssistance";

jest.mock('helpers/searchHelper', () => require('./awardV2Helper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/awardv2/AwardV2', () => jest.fn(() => null));

describe('AwardV2Container', () => {
    it('should make an API call for the selected award on mount', async () => {

        const container = mount(
            <AwardContainer
                {...mockParams}
                {...mockActions} />);

        const parseAward = jest.fn();
        container.instance().parseAward = parseAward;
        await container.instance().awardRequest.promise;

        expect(parseAward).toHaveBeenCalled();
    });

    it('should make an API call when the award ID parameter changes', () => {
        const container = shallow (
            <AwardContainer
                {...mockParams}
                {...mockActions} />);

        const getSelectedAward = jest.fn();
        container.instance().getSelectedAward = getSelectedAward;

        container.instance().componentDidMount();
        expect(getSelectedAward).toHaveBeenCalledTimes(1);
        expect(getSelectedAward).toHaveBeenCalledWith('1234');

        const prevProps = Object.assign({}, mockParams, {
            params: {
                awardId: '222'
            }
        });

        container.instance().componentDidUpdate(prevProps);

        expect(getSelectedAward).toHaveBeenCalledTimes(2);
        expect(getSelectedAward).toHaveBeenLastCalledWith('1234');
    });

    describe('parseAward', () => {
        it('should parse returned contract data and send to the Redux store', () => {
            const awardContainer = shallow(
                <AwardContainer
                    {...mockParams}
                    {...mockActions} />);

            const expectedAward = Object.create(BaseContract);
            expectedAward.populate(mockContract);

            awardContainer.instance().parseAward(mockContract);

            expect(mockActions.setAward).toHaveBeenCalledWith(expectedAward);
        });
        it('should parse returned IDV data and send to the Redux store', () => {
            const awardContainer = shallow(
                <AwardContainer
                    {...mockParams}
                    {...mockActions} />);

            const expectedAward = Object.create(BaseIdv);
            expectedAward.populate(mockIdv);

            awardContainer.instance().parseAward(mockIdv);

            expect(mockActions.setAward).toHaveBeenCalledWith(expectedAward);
        });
        it('should parse returned financial assistance data and send to the Redux store', () => {
            const awardContainer = shallow(
                <AwardContainer
                    {...mockParams}
                    {...mockActions} />);

            const expectedAward = Object.create(BaseFinancialAssistance);
            expectedAward.populate(mockLoan);

            awardContainer.instance().parseAward(mockLoan);

            expect(mockActions.setAward).toHaveBeenCalledWith(expectedAward);
        });
    });
});
