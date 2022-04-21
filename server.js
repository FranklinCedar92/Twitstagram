const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// sets routes
app.use(require('./routes'));

// mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pizza-hunt', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// loga mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
