const express = require('express');
const router = express.Router();
const receiptController = require('../controllers/receiptController');

router.get('/receipt/:receiptId', receiptController.viewReceipt);
router.post('/report-issue', receiptController.reportIssue);

module.exports = router;
