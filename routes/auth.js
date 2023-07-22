const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('../data/coupons');
const Farmer = require('../model/farmerSchema');
const Partner = require('../model/partnerSchema');
const authenticate = require('../middleware/authenticate');


//create part USING ASYNC AWAIT
router.post("/create", authenticate, async (req, res) => {

  //object destructuring
  const {
    partner,
    panchayat,
    block,
    dist,
    farmer_name,
    farmer_register,
    father_husband_name,
    mobile,
    aadhar,
    wife_husband_aadhar,
    reven_vill,
    own_agri_land,
    khata,
    khesra,
    rakwa,
    agri_implem,
    crops,
    dis_pmp,
    // no_dis_pmp,
    elec_pmp,
    // no_elec_pmp,
    kcc,
    benef_pm_kisan,
    // payment_install
  } = req.body;

  const no_dis_pmp = (dis_pmp === 'No') ? 0 : req.body.no_dis_pmp;
  const no_elec_pmp = (elec_pmp === 'No') ? 0 : req.body.no_elec_pmp;
  const payment_install = (benef_pm_kisan === 'No') ? 0 : req.body.payment_install;


  try {
    //left coupon_code from database  and  right one from body
    // const isIdExist = await Coupon.findOne({ coupon_id: coupon_id });
    const isFarmerExist = await Farmer.findOne({ aadhar: aadhar });
    if (isFarmerExist) {
      return res.status(422).json({ error: "Farmer already exist" });
    } else {
      //  const user = new User({name:name, email:email, phone:phone, work:work, password:password, cnfpass:cnfpass});
      //or
      const farmer = new Farmer({
        partner,
        panchayat,
        block,
        dist,
        farmer_name,
        farmer_register,
        father_husband_name,
        mobile,
        aadhar,
        wife_husband_aadhar,
        reven_vill,
        own_agri_land,
        khata,
        khesra,
        rakwa,
        agri_implem,
        crops,
        dis_pmp,
        no_dis_pmp,
        elec_pmp,
        no_elec_pmp,
        kcc,
        benef_pm_kisan,
        payment_install
      });

      //yaha pe password ko hash krna hai save se phle
      // done hashing in partnerSchema.js 
      const isSaved = await farmer.save();

      if (isSaved) {
        return res.status(201).json({ message: "Farmer details saved successfullly" });
      } else {
        return res.status(500).json({ error: "Farmer creation failed" });
      }
    }

  } catch (err) {
    console.log(err);
  }
})


router.post('/edit', authenticate, async (req, res) => {
  //object destructuring
  const {
    _id,
    partner,
    panchayat,
    block,
    dist,
    farmer_name,
    farmer_register,
    father_husband_name,
    mobile,
    aadhar,
    wife_husband_aadhar,
    reven_vill,
    own_agri_land,
    khata,
    khesra,
    rakwa,
    agri_implem,
    crops,
    dis_pmp,
    // no_dis_pmp,
    elec_pmp,
    // no_elec_pmp,
    kcc,
    benef_pm_kisan,
    // payment_install
  } = req.body;

  const no_dis_pmp = (dis_pmp === 'No') ? 0 : req.body.no_dis_pmp;
  const no_elec_pmp = (elec_pmp === 'No') ? 0 : req.body.no_elec_pmp;
  const payment_install = (benef_pm_kisan === 'No') ? 0 : req.body.payment_install;

  try {
    //left coupon_code from database  and  right one from body
    // const isCodeExist = await Coupon.findOne({ coupon_code: coupon_code });
    try {
      const isUpdate = await Farmer.updateOne({ _id: _id }, {
        $set: {
          panchayat: panchayat,
          farmer_name: farmer_name,
          farmer_register: farmer_register,
          father_husband_name: father_husband_name,
          mobile: mobile,
          aadhar: aadhar,
          wife_husband_aadhar: wife_husband_aadhar,
          reven_vill: reven_vill,
          own_agri_land: own_agri_land,
          khata: khata,
          khesra: khesra,
          rakwa: rakwa,
          agri_implem: agri_implem,
          crops: crops,
          dis_pmp: dis_pmp,
          no_dis_pmp: no_dis_pmp,
          elec_pmp: elec_pmp,
          no_elec_pmp: no_elec_pmp,
          kcc: kcc,
          benef_pm_kisan: benef_pm_kisan,
          payment_install: payment_install
        }
      });

      if (isUpdate) {
        return res.status(201).json({ message: "Farmer Edited successfullly" });
      } else {
        return res.status(500).json({ error: "edition failed" });
      }
    } catch (err) {
      return res.status(422).json({ error: "edition failed" });
    }
  } catch (err) {
    console.log(err);
  }
})


router.get('/getdata', authenticate, (req, res) => {
  // console.log("in get create");
  res.send(req.rootPartner);
})


router.get('/getfarmer', authenticate, (req, res) => {

  const partner = req.rootPartner.name;

  if (partner === "Renupawanpari23") {
    Farmer.find(function (err, farmers) {
      if (err) {
        console.log(error);
      }
      else {
        res.send(farmers);
      }
    })
  } else {
    Farmer.find({ partner: partner }, function (err, farmers) {
      if (err) {
        console.log(error);
      }
      else {
        res.send(farmers);
      }
    })
  }
})


router.post("/signup", async (req, res) => {

  const { name, email, phone, password, cpassword } = req.body;

  console.log("in signup");

  try {
    const userExist = await Partner.findOne({ name: name });

    if (userExist) {
      return res.status(420).json({ error: "User already exits" });
    } else {
      const partner = new Partner({
        name: name,
        email: email,
        phone: phone,
        password: password,
        cpassword: cpassword
      });

      const partnerRegister = await partner.save();

      if (partnerRegister) {
        res.status(201).send("You are registered with us");
      }
    }
  } catch (error) {
    res.status(500).send("there is an error");
    console.log(error);
  }
});


// login route
router.post("/login", async (req, res) => {

  try {
    const { name, password } = req.body;

    const isPartnerRegister = await Partner.findOne({ name: name });

    // console.log(partnerLogin);

    if (isPartnerRegister) {
      const isMatch = await bcrypt.compare(password, isPartnerRegister.password);

      const token = await isPartnerRegister.generateAuthToken();

      // console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" });
      } else {
        res.status(201).json({ message: "signed in successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/forgot', async (req, res) => {

  const { name, email, phone } = req.body;

  try {
    const userNameExist = await Partner.findOne({ name: name });
    const userEmailExist = await Partner.findOne({ email: email });
    const userPhoneExist = await Partner.findOne({ phone: phone });

    if (userNameExist && userEmailExist && userPhoneExist) {
      return res.status(201).json({ message: "Details Verified Successfully" });
    } else {
      return res.status(500).json({ error: "Details Not match with our Records" });
    }
  } catch (error) {
    res.status(500).send("there is an error");
    // console.log(error);
  }
})

router.post('/reset', async (req, res) => {

  const { name, password, cnfpassword } = req.body;

  try {
    const userExist = await Partner.findOne({ name: name });

    // if (!userExist) {
    //   return res.status(420).json({ error: "User not Registered" });
    // } else {
    const email = userExist.email;
    const phone = userExist.phone;

    // Partner.deleteOne({ name: name });
    Partner.deleteOne({ name: name }, function (err) {
      if (err) {
        console.log(err);
      }
    });

    const updatedPartner = new Partner({
      name: name,
      email: email,
      phone: phone,
      password: password,
      cpassword: cnfpassword,
    });

    const isReset = await updatedPartner.save();

    if (isReset) {
      return res.status(201).json({ message: "Password Reset successfully" });
    } else {
      return res.status(500).json({ error: "Reset Password failed" });
    }
    // }
  } catch (error) {
    res.status(500).send("there is an error");
    console.log(error);
  }
})

router.get('/logout', (req, res) => {
  res.clearCookie('jwtoken');
  res.status(200).send('user logged out');
})



module.exports = router; 