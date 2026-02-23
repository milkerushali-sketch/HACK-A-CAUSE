"""
Unit tests for reading service
"""
import pytest
from src.backend.services.reading_service import ReadingService
from src.backend.models import ReadingCreate

def test_quality_assessment():
    """Test water quality assessment"""
    # Good quality
    quality = ReadingService._assess_quality(7.0, 200, 1.0)
    assert quality == "good"
    
    # Fair quality
    quality = ReadingService._assess_quality(6.8, 300, 2.0)
    assert quality == "fair"
    
    # Poor quality
    quality = ReadingService._assess_quality(5.0, 600, 8.0)
    assert quality == "poor"

def test_reading_creation():
    """Test reading creation"""
    reading_data = ReadingCreate(
        sensor_id="test-sensor",
        ph_level=7.2,
        tds_level=220,
        turbidity=1.5
    )
    result = ReadingService.save_reading(reading_data)
    assert result['ph_level'] == 7.2
    assert result['quality_status'] in ['good', 'fair', 'poor']

def test_statistics_calculation():
    """Test statistics calculation"""
    # This would require actual data
    # Use fixtures and mocks in real tests
    pass
