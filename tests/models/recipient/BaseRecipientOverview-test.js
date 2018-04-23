import
    BaseRecipientOverview,
    {
        parseBusinessCategories,
        prepareLocation
    } 
from 'models/v2/recipient/BaseRecipientOverview';

import BaseRecipientAmounts from 'models/v2/recipient/BaseRecipientAmounts';
import CoreLocation from 'models/v2/CoreLocation';

import * as MockData from './mockData';

describe('BaseRecipientOverview', () => {
    describe('populate', () => {
        it('should remap the API response to the base model object', () => {
            const data = MockData.mockChild;
            const model = Object.create(BaseRecipientOverview);
            model.populate(data);

            expect(model.name).toEqual(data.name);
            expect(model.duns).toEqual(data.duns);
            expect(model.parentDuns).toEqual(data.parent_duns);
            expect(model.parentName).toEqual(data.parent_name);
            expect(model.lei).toEqual(data.lei);
        });
        it('should fallback to default values when the API returns falsy values', () => {
            const model = Object.create(BaseRecipientOverview);
            model.populate({});

            expect(model.name).toEqual('');
            expect(model.duns).toEqual('');
            expect(model.parentDuns).toEqual('');
            expect(model.parentName).toEqual('');
            expect(model.lei).toEqual('');
        });
        it('should create a location object that has CoreLocation in its prototype chain', () => {
            const data = MockData.mockChild;
            const model = Object.create(BaseRecipientOverview);
            model.populate(data);

            expect(CoreLocation.isPrototypeOf(model.location)).toBeTruthy();
        });
        it('should create an amounts object that has BaseRecipientAmounts in its prototype chain', () => {
            const data = MockData.mockChild;
            const model = Object.create(BaseRecipientOverview);
            model.populate(data);

            expect(BaseRecipientAmounts.isPrototypeOf(model.amounts)).toBeTruthy();
        });
    });
    describe('id', () => {
        it('should return the DUNS by default', () => {
            const data = MockData.mockChild;
            const model = Object.create(BaseRecipientOverview);
            model.populate(data);

            expect(model.id).toEqual(model.duns);
        });
        it('should return the property that is specified in its _idField', () => {
            const data = MockData.mockChild;
            const model = Object.create(BaseRecipientOverview);
            model.populate(data);

            model._idField = 'lei'; // correct way to do this is via the populate method, but this lets us explicitly check
            expect(model.id).toEqual(model.lei);
        });
    });

    describe('isParent', () => {
        it('should return true when the DUNS value matches the Parent DUNS value', () => {
            const data = MockData.mockParent;
            const model = Object.create(BaseRecipientOverview);
            model.populate(data);

            expect(model.isParent).toBeTruthy();
        });
        it('should return false when the DUNS value does not match the Parent DUNS value', () => {
            const data = MockData.mockChild;
            const model = Object.create(BaseRecipientOverview);
            model.populate(data);

            expect(model.isParent).toBeFalsy();
        });
        it('should return false when the DUNS value is not specified', () => {
            const data = Object.assign({}, MockData.mockParent, {
                duns: null
            });
            const model = Object.create(BaseRecipientOverview);
            model.populate(data);

            expect(model.isParent).toBeFalsy();
        });
    });
});

describe('prepareLocation', () => {
    it('should remap the API response to the object structure required by CoreLocation', () => {
        const data = MockData.mockChild.location;
        const output = prepareLocation(data);

        expect(output.address1).toEqual(data.address_line1);
        expect(output.address2).toEqual(data.address_line2);
        expect(output.address3).toEqual(data.address_line3);
        expect(output.city).toEqual(data.city_name);
        expect(output.stateCode).toEqual(data.state_code);
        expect(output.country).toEqual(data.country_name);
        expect(output.countryCode).toEqual(data.location_country_code);
        expect(output.zip5).toEqual(data.zip5);
    });
});

describe('parseBusinessCategories', () => {
    it('should iterate through the API response business categories and remap them to user-readable strings', () => {
        const data = ['local_government_owned', 'private_university_or_college'];
        const output = parseBusinessCategories(data);

        expect(output).toEqual([
            'Local Government Owned',
            'Private University or College'
        ]);
    });
    it('should use the API response value when it is not mappable to a user-readable string', () => {
        const data = ['westworld_style_amusement_park'];
        const output = parseBusinessCategories(data);

        expect(output).toEqual(['westworld_style_amusement_park']);
    });
});
