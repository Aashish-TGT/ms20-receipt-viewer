const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const receiptRoutes = require('./routes/receiptRoutes');

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/', receiptRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
