const { customerType, accountIndustry, team, acvRange } = require("../controllers/controllers");

module.exports = (app) => {
    app.get('/api/customer-type', customerType);
    app.get('/api/account-industry', accountIndustry);
    app.get('/api/team', team);
    app.get('/api/acv-range', acvRange);
};