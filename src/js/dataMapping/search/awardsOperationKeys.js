/**
 * awardsOperationKeys.js
 * Created by michaelbray on 8/8/17.
 */

export const rootKeys = {
    keyword: 'keyword',
    timePeriod: 'time_period',
    awardType: 'award_type_codes',
    agencies: 'agencies',
    recipients: 'legal_entities',
    recipientLocationScope: 'recipient_scope',
    recipientLocation: 'recipient_locations',
    recipientType: 'recipient_type_names',
    placeOfPerformanceScope: 'place_of_performance_scope',
    placeOfPerformance: 'place_of_performance_locations',
    awardAmount: 'award_amounts',
    awardID: 'award_ids',
    cfda: 'program_numbers',
    naics: 'naics_codes',
    psc: 'psc_codes',
    contractPricing: 'contract_pricing_type_codes',
    setAsideType: 'set_aside_type_codes',
    extentCompeted: 'extent_competed_type_codes'
};

export const timePeriodKeys = {
    startDate: 'start_date',
    endDate: 'end_date'
};

export const agencyKeys = {
    type: 'type',
    tier: 'tier',
    name: 'name'
};

export const awardAmountKeys = {
    min: 'lower_bound',
    max: 'upper_bound'
};
