const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/twitstagram', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// logs mongo queries being executed
mongoose.set('debug', true);

// sets routes
app.use(require('./routes'));

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
