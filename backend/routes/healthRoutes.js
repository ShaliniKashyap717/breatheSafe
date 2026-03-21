const express = require('express');
const router = express.Router();
const HealthLog = require('../models/HealthLog');
const { getHealthPrediction } = require('../services/mlService');


// URL: http://localhost:5000/api/health/check
router.post('/check', async (req, res) => {
  try {
    const { userId, userData, aqiData, locationName, coordinates } = req.body;

    // prediction from FastAPI
    const prediction = await getHealthPrediction(userData, aqiData);

    // saved to the private HealthLog 
    const newLog = new HealthLog({
      userId,
      locationName,
      coordinates,
      aqiSnapshot: {
        pm2_5: aqiData.iaqi?.pm25?.v || 0,
        pm10: aqiData.iaqi?.pm10?.v || 0,
        no2: aqiData.iaqi?.no2?.v || 0,
        temp: aqiData.iaqi?.t?.v || 0,
      },
      healthRiskScore: prediction ? prediction.risk_score : 0,
      riskStatus: prediction ? prediction.status : "Unknown",
      mainDriver: prediction ? prediction.main_driver : "N/A",
      recommendation: prediction ? prediction.recommendation : "N/A"
    });

    const savedLog = await newLog.save();
    res.status(200).json(savedLog);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;