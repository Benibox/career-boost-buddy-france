// backend/index.js
require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const userRoutes = require('./routes/userRoutes');

console.log('▶️ démarrage du backend');
console.log('MONGO_URI =', process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connectée'))
  .catch(err => console.error('❌ Erreur MongoDB :', err));

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('API TrustMyJob OK'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Serveur sur http://localhost:${PORT}`)
);
