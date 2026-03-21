const mongoose = require('mongoose');

const healthLogSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  locationName: { type: String, required: true },
  
  
  aqiSnapshot: {
    pm2_5: Number,
    pm10: Number,
    no2: Number,
    temp: Number,
    humidity: Number
  },

  
  healthRiskScore: { type: Number, required: true },
  riskStatus: { type: String, enum: ['Low Risk', 'Medium Risk', 'High Risk'] },
  mainDriver: { type: String },
  recommendation: { type: String },

  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HealthLog', healthLogSchema);