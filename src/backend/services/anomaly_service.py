"""
Anomaly detection service using Machine Learning
"""
from typing import List, Dict, Any, Tuple
import pandas as pd
from sklearn.ensemble import IsolationForest
import numpy as np
from datetime import datetime, timedelta
from services.firebase_service import FirebaseService

firebase_service = FirebaseService()

class AnomalyDetectionService:
    """Detect anomalies in sensor data using Isolation Forest"""
    
    # Configuration
    CONTAMINATION_RATE = 0.1  # Assume 10% of data might be anomalous
    MIN_SAMPLES = 5  # Minimum samples needed for detection
    
    @staticmethod
    def detect_anomalies(sensor_id: str, hours: int = 24) -> Tuple[List[str], List[Dict]]:
        """
        Detect anomalies for a sensor over specified time range.
        Returns tuple of (anomaly_ids, anomaly_details)
        """
        try:
            readings = firebase_service.get_readings(sensor_id, limit=1000)
            
            # Filter by time
            now = datetime.now()
            cutoff = now - timedelta(hours=hours)
            
            filtered_readings = []
            for reading in readings:
                try:
                    created = datetime.fromisoformat(reading.get('created_at', ''))
                    if created >= cutoff:
                        filtered_readings.append(reading)
                except:
                    pass
            
            if len(filtered_readings) < AnomalyDetectionService.MIN_SAMPLES:
                return [], []
            
            # Prepare data for anomaly detection
            df = AnomalyDetectionService._prepare_dataframe(filtered_readings)
            
            if df.empty or len(df) < AnomalyDetectionService.MIN_SAMPLES:
                return [], []
            
            # Train and predict
            features = ['ph_level', 'tds_level', 'turbidity']
            X = df[features].values
            
            model = IsolationForest(
                contamination=AnomalyDetectionService.CONTAMINATION_RATE,
                random_state=42,
                n_estimators=100
            )
            
            predictions = model.fit_predict(X)
            scores = model.score_samples(X)
            
            # Identify anomalies
            anomaly_ids = []
            anomaly_details = []
            
            for idx, (pred, score) in enumerate(zip(predictions, scores)):
                if pred == -1:  # Anomaly detected
                    reading = filtered_readings[idx]
                    reading_id = reading.get('id', f'reading_{idx}')
                    anomaly_ids.append(reading_id)
                    
                    # Update reading with anomaly flag
                    firebase_service.db.reference(f'readings/{sensor_id}/{reading_id}').update({
                        'is_anomaly': True,
                        'anomaly_score': float(score)
                    })
                    
                    anomaly_details.append({
                        'reading_id': reading_id,
                        'sensor_id': sensor_id,
                        'timestamp': reading.get('created_at'),
                        'ph_level': reading.get('ph_level'),
                        'tds_level': reading.get('tds_level'),
                        'turbidity': reading.get('turbidity'),
                        'anomaly_score': float(score),
                        'severity': AnomalyDetectionService._determine_severity(score)
                    })
            
            return anomaly_ids, anomaly_details
        
        except Exception as e:
            print(f"Error detecting anomalies: {e}")
            return [], []
    
    @staticmethod
    def _prepare_dataframe(readings: List[Dict]) -> pd.DataFrame:
        """Prepare dataframe from readings"""
        data = []
        for reading in readings:
            data.append({
                'id': reading.get('id'),
                'ph_level': reading.get('ph_level', 7.0),
                'tds_level': reading.get('tds_level', 0),
                'turbidity': reading.get('turbidity', 0),
                'created_at': reading.get('created_at')
            })
        
        return pd.DataFrame(data)
    
    @staticmethod
    def _determine_severity(score: float) -> str:
        """Determine severity based on anomaly score"""
        score_abs = abs(score)
        if score_abs > 0.5:
            return "critical"
        elif score_abs > 0.3:
            return "high"
        elif score_abs > 0.1:
            return "medium"
        return "low"
    
    @staticmethod
    def get_anomaly_statistics(
        sensor_id: str,
        hours: int = 24
    ) -> Dict[str, Any]:
        """Get anomaly statistics for a sensor"""
        anomaly_ids, anomaly_details = AnomalyDetectionService.detect_anomalies(
            sensor_id,
            hours
        )
        
        readings = firebase_service.get_readings(sensor_id, limit=1000)
        
        # Filter by time
        now = datetime.now()
        cutoff = now - timedelta(hours=hours)
        
        total_in_range = 0
        for reading in readings:
            try:
                created = datetime.fromisoformat(reading.get('created_at', ''))
                if created >= cutoff:
                    total_in_range += 1
            except:
                pass
        
        anomaly_percentage = (len(anomaly_ids) / total_in_range * 100) if total_in_range > 0 else 0
        
        return {
            'total_readings': total_in_range,
            'anomalies_detected': len(anomaly_ids),
            'anomaly_percentage': round(anomaly_percentage, 2),
            'last_anomaly_time': anomaly_details[0]['timestamp'] if anomaly_details else None,
            'average_anomaly_score': round(
                sum(a['anomaly_score'] for a in anomaly_details) / len(anomaly_details)
                if anomaly_details else 0,
                4
            )
        }
