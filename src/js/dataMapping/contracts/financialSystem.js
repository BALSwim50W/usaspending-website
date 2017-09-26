/**
 * financialSystem.js
 * Created by Kevin Li 3/6/17
 */

const tableFields = {
    columnWidths: {
        submissionDate: 0,
        fedAccount: 0,
        tas: 0,
        programActivity: 300,
        objectClass: 300,
        fundingObligated: 0
    },
    defaultSortDirection: {
        submissionDate: 'desc',
        fedAccount: 'asc',
        tas: 'desc',
        programActivity: 'asc',
        objectClass: 'asc',
        fundingObligated: 'desc'
    },
    table: {
        _fields: [
            'financial_accounts_by_awards_id',
            'certified_date',
            'treasury_account',
            'object_class',
            'program_activity',
            'transaction_obligated_amount'
        ],
        _order: [
            'submissionDate',
            'fedAccount',
            'tas',
            'programActivity',
            'objectClass',
            'fundingObligated'
        ],
        _sortFields: {
            submissionDate: 'certified_date',
            fedAccount: 'treasury_account__federal_account__account_title',
            tas: 'treasury_account__tas_rendering_label',
            programActivity: 'program_activity__program_activity_name',
            objectClass: 'object_class__object_class_name',
            fundingObligated: 'transaction_obligated_amount'
        },
        _mapping: {
            submissionDate: 'submissionDate',
            fedAccount: 'fedAccount',
            tas: 'tas',
            programActivity: 'programActivity',
            objectClass: 'objectClass',
            fundingObligated: 'fundingObligated'
        },
        submissionDate: 'Submission Date',
        fedAccount: 'Federal Account Name',
        tas: 'Treasury Account Symbol',
        programActivity: 'Program Activity',
        objectClass: 'Object Class',
        fundingObligated: 'Funding Obligated'
    }
};

export default tableFields;
