const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5003; // Port numarasını 5002 olarak değiştirdik

app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect('mongodb://127.0.0.1:27017/yourDatabaseName', {
    // useNewUrlParser: true, // Bu satırı kaldırdık
    // useUnifiedTopology: true // Bu satırı kaldırdık
})
.then(() => console.log('MongoDB bağlantısı başarılı'))
.catch(err => console.error('MongoDB bağlantı hatası:', err));

// Routes
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});