const { readJson } = require('../utils/helpers')

const customerType = (req, res) => {
    try {
        const file = readJson('customer_type.json');
        return res.status(200).json({
            message: 'success',
            data: file,
        });
    } catch (e) {
        console.log(`Error [customerType]: ${e.message}`);
        return res.json({
            message: e.message,
            data: [],
        });
    }
};

const accountIndustry = (req, res) => {
    try {
        const file = readJson('account_industry.json');
        return res.status(200).json({
            message: 'success',
            data: file,
        });
    } catch (e) {
        console.log(`Error [accountIndustry]: ${e.message}`);
        return res.json({
            message: e.message,
            data: [],
        });
    }
};

const team = (req, res) => {
    try {
        const file = readJson('team.json');
        return res.status(200).json({
            message: 'success',
            data: file,
        });
    } catch (e) {
        console.log(`Error [team]: ${e.message}`);
        return res.json({
            message: e.message,
            data: [],
        });
    }
};

const acvRange = (req, res) => {
    try {
        const file = readJson('acv_range.json');
        return res.status(200).json({
            message: 'success',
            data: file,
        });
    } catch (e) {
        console.log(`Error [acvRange]: ${e.message}`);
        return res.json({
            message: e.message,
            data: [],
        });
    }
};

module.exports = {
    customerType,
    accountIndustry,
    team,
    acvRange,
};