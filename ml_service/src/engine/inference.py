import joblib
import pandas as pd
import numpy as np

class Predictor:
    def __init__(self):
        self.model = joblib.load('models/breathesafe_ensemble.pkl')
        self.explainer = joblib.load('models/shap_explainer.pkl')

    def run(self, data_dict):
        df = pd.DataFrame([data_dict])
        # Ensure types for CatBoost
        for col in ['is_smoker', 'has_asthma', 'mask_type']:
            df[col] = df[col].astype('category')
            
        risk_score = self.model.predict(df)[0]
        
        # Get SHAP values for the first estimator (XGBoost)
        shap_values = self.explainer.shap_values(df)
        feature_names = df.columns.tolist()
        
        # Find top driver
        top_idx = np.argmax(np.abs(shap_values[0]))
        main_driver = feature_names[top_idx]
        
        return {
            "risk_score": round(float(risk_score), 4),
            "main_driver": main_driver,
            "recommendation": "Wear a mask" if risk_score > 0.6 else "Clear to go"
        }