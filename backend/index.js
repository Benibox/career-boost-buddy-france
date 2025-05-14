// backend/index.js
require('dotenv').config();      // <-- charge ton .env
const express = require('express');
const mongoose = require('mongoose');

console.log('▶️ démarrage du backend');
console.log('MONGO_URI =', process.env.MONGO_URI);

// connexion à Mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connectée'))
  .catch(err => console.error('❌ Erreur MongoDB :', err));

// setup express
const app = express();
const PORT = process.env.PORT || 4000;
app.get('/', (req, res) => res.send('API TrustMyJob OK'));
app.listen(PORT, () =>
  console.log(`🚀 Serveur sur http://localhost:${PORT}`)
);
