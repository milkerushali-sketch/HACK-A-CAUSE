"""
Unit tests for anomaly detection service
"""
import pytest
from src.backend.services.anomaly_service import AnomalyDetectionService

def test_anomaly_severity_determination():
    """Test severity determination"""
    severity = AnomalyDetectionService._determine_severity(-0.6)
    assert severity == "critical"
    
    severity = AnomalyDetectionService._determine_severity(-0.35)
    assert severity == "high"
    
    severity = AnomalyDetectionService._determine_severity(-0.15)
    assert severity == "medium"
    
    severity = AnomalyDetectionService._determine_severity(-0.05)
    assert severity == "low"

def test_dataframe_preparation():
    """Test dataframe preparation"""
    readings = [
        {
            'id': 'r1',
            'ph_level': 7.0,
            'tds_level': 200,
            'turbidity': 1.0,
            'created_at': '2026-02-23T10:00:00'
        },
        {
            'id': 'r2',
            'ph_level': 7.5,
            'tds_level': 250,
            'turbidity': 1.5,
            'created_at': '2026-02-23T10:15:00'
        }
    ]
    df = AnomalyDetectionService._prepare_dataframe(readings)
    assert len(df) == 2
    assert 'ph_level' in df.columns
    assert 'tds_level' in df.columns
    assert 'turbidity' in df.columns
