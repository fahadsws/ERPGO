const express = require('express');
const router = express.Router();
const loginUser = require('../Controller/Auth/Login');
const leavetype = require('../Controller/AllGetAPi/LeaveType');
const middelware = require('../Middelware/TokenMidelware');
const leavesumbit = require('../Controller/AllPostApi/LeaveMange');
const addcomplaine = require('../Controller/AllPostApi/AddComplaine');
const allemploye = require('../Controller/AllGetAPi/AllEmplye');
const awards = require('../Controller/AllGetAPi/Award');
const promotion = require('../Controller/AllGetAPi/Promotion');
const leaves = require('../Controller/AllGetAPi/Leaves');
const complaine = require('../Controller/AllGetAPi/Complaines');
const profileupdate = require('../Controller/AllPostApi/ProfileUpdate');
const forgotpassword = require('../Controller/AllPostApi/ForgotPassword');
const forgotpass = require('../Controller/AllPostApi/ForgotPass');
const support = require('../Controller/AllGetAPi/Support');
const announcements = require('../Controller/AllGetAPi/AllAnouncement');
const addsuport = require('../Controller/AllPostApi/Support');
const deletesupport = require('../Controller/AllGetAPi/DeleateSupport');
const payslip = require('../Controller/AllGetAPi/PaySlip');
const events = require('../Controller/AllGetAPi/Events');



















router.post('/login', loginUser);
router.get('/leavetype',middelware, leavetype);
router.post('/leavesumbit',middelware, leavesumbit);
router.post('/addcomplaine',middelware, addcomplaine);
router.get('/allemploye',middelware, allemploye);
router.get(`/awards/:id`,middelware, awards);
router.get(`/promotion/:id`,middelware, promotion);
router.get(`/leaves/:id`,middelware, leaves);
router.get(`/complaine/:id`,middelware, complaine);
router.post('/profileupdate',middelware, profileupdate);
router.post('/forgotpassword',middelware, forgotpassword);
router.get('/forgotpass', forgotpass);
router.get('/support', support);
router.get('/announcements',middelware, announcements);
router.post('/addsupport',middelware, addsuport);
router.get(`/deletesupport/:id`,middelware, deletesupport);
router.get(`/payslip/:id`,middelware, payslip);
router.get(`/events/:id`,middelware, events);

















module.exports = router;
