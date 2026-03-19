const axios = require('axios');

const getHealthPrediction = async (userData, aqiData) => {
  try {
    // calling internal Python API
    const response = await axios.post('http://localhost:5000/predict', {
      user: userData,
      aqi: aqiData
    });
    return response.data.risk_score;
  } catch (error) {
    console.error("ML Service unreachable");
    return null;
  }
};