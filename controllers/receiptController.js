const fs = require('fs');
const path = require('path');
const { getSecureBlobUrl } = require('../utils/azureBlob');

exports.viewReceipt = async (req, res) => {
  const receiptId = req.params.receiptId;
  const blobName = `${receiptId}.pdf`;

  try {
    const pdfUrl = await getSecureBlobUrl(blobName);
    res.render('receipt', { pdfUrl, receiptId, success: req.query.success });
  } catch (error) {
    console.error("Error fetching secure blob URL:", error);
    res.status(500).send("Error loading receipt.");
  }
};

exports.reportIssue = async (req, res) => {
  const { receiptId, message } = req.body;

  try {
    const logMessage = `Receipt ID: ${receiptId}\nIssue: ${message}\nTime: ${new Date().toISOString()}\n\n`;
    const logPath = path.join(__dirname, '../logs/issue_reports.txt');

    // Create logs directory if it doesn't exist
    if (!fs.existsSync(path.dirname(logPath))) {
      fs.mkdirSync(path.dirname(logPath));
    }

    // Append issue to log file
    fs.appendFileSync(logPath, logMessage, 'utf8');

    // Redirect back to viewer with success message
    res.redirect(`/receipt/${receiptId}?success=true`);
  } catch (error) {
    console.error("Error logging issue:", error);
    res.status(500).send("Failed to submit issue.");
  }
};
