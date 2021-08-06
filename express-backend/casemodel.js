const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const CaseSchema = new Schema({
    title: String,
    description: String,
    counseleeid: String,
    counselerid: String,
    status: String
});

const Case = mongoose.model('Case',CaseSchema);

module.exports = Case;