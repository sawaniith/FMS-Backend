const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    partner: {
        type: String,
        required: true
    },
    panchayat: {
        type: String,
        required: true
    },
    block: {
        type: String,
        required: true
    },
    dist: {
        type: String,
        required: true
    },
    farmer_name: {
        type: String,
        required: true
    },
    farmer_register: {
        type: String,
        required: true
    },
    father_husband_name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    aadhar: {
        type: String,
        required: true,
        unique: true
    },
    wife_husband_aadhar: {
        type: String,
        required: true
    },
    reven_vill: {
        type: String,
        required: true
    },
    own_agri_land: {
        type: String,
        required: true
    },
    khata: {
        type: String,
        required: true
    },
    khesra: {
        type: String,
        required: true
    },
    rakwa: {
        type: String,
        required: true
    },
    agri_implem: {
        type: String,
        require: true
    },
    crops: {
        type: [String],
        required: true
    },
    dis_pmp: {
        type: String,
        required: true
    },
    no_dis_pmp: {
        type: String,
        // required: true
    },
    elec_pmp: {
        type: String,
        required: true
    },
    no_elec_pmp: {
        type: String,
        // required: true
    },
    kcc: {
        type: String,
        require: true
    },
    benef_pm_kisan: {
        type: String,
        required: true
    },
    payment_install: {
        type: Number,
        // required: true
    }
});

//creating collection 'COUPONS'
const Farmer = mongoose.model('FARMER', farmerSchema);

//export
module.exports = Farmer;