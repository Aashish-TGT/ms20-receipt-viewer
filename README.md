# 📄 MS-20: Receipt Viewer Service

This microservice is responsible for **securely displaying digital receipts (PDF format)** and collecting feedback or issue reports from users. It fetches PDFs from **Azure Blob Storage** and renders them via a browser.

---

## 🚀 Features

- 🔐 Secure access to receipt PDFs via SAS tokens
- 📄 In-browser receipt viewer (iframe)
- 📝 Feedback/issue reporting form below each receipt
- 🗂 Issues are logged to a file (`logs/issue_reports.txt`)
- 📦 Cleanly separated in controllers, routes, views, and utils

---

## 📁 Project Structure

ms20-receipt-viewer/
├── app.js
├── .env
├── controllers/
├── routes/
├── utils/
├── views/
├── public/
├── logs/ (auto-created on form submission)
└── README.md


---

## 🔧 Tech Stack

- **Node.js + Express.js**
- **EJS** for server-side rendering
- **Azure Blob Storage SDK**
- **Tailored CSS** for layout
- **Environment variables (.env)** for secure config

---

## 🌐 How It Works

1. User visits `/receipt/:receiptId`
2. PDF is fetched securely from Azure Blob using SAS token
3. PDF is rendered inside an iframe
4. User can submit an issue using the form
5. Feedback is saved in `logs/issue_reports.txt`

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-org/ms20-receipt-viewer.git
cd ms20-receipt-viewer

Install Dependencies
npm install

Configure .env File
AZURE_STORAGE_ACCOUNT_NAME=your_account_name
AZURE_STORAGE_ACCOUNT_KEY=your_account_key
AZURE_CONTAINER_NAME=your_container_name

Start the Server
node app.js

Visit:
http://localhost:3000/receipt/<receiptId>
For example:
http://localhost:3000/receipt/sample-receipt

Format:
Receipt ID: demo123
Issue: This receipt has wrong amount
Time: 2025-07-13T02:10:00Z

🔐 Azure Blob Integration
Azure Blob SDK is used to generate secure SAS URLs:

@azure/storage-blob library used

Only read permission is granted

SAS token expires after 1 hour

➡️ Code used in utils/azureBlob.js
generateBlobSASQueryParameters({
  containerName,
  blobName,
  permissions: BlobSASPermissions.parse("r"),
  startsOn: now,
  expiresOn: expiry,
}, sharedKeyCredential)

📦 Deployment Notes
App is portable and can run on any Node.js server
Can be deployed behind a reverse proxy (e.g., NGINX)
Can integrate with Admin Panel (MS-6) using:
Link: target="_blank"
or iframe embed
👨‍💻 Author
Developed by [Aashish]
intern in Tgt's
For: Digital Receipts Platform (Microservices Architecture)

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more info.
