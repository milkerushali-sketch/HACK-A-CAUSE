"""
Alert management and notification service
"""
from typing import Dict, Any, List
from datetime import datetime
from services.firebase_service import FirebaseService
import os

firebase_service = FirebaseService()

class AlertService:
    """Manage alerts and notifications"""
    
    ALERT_TYPES = {
        'ph_high': {'threshold': 8.5, 'severity': 'high'},
        'ph_low': {'threshold': 6.5, 'severity': 'high'},
        'tds_high': {'threshold': 500, 'severity': 'high'},
        'turbidity_high': {'threshold': 5, 'severity': 'medium'},
        'anomaly': {'threshold': 0.3, 'severity': 'high'},
    }
    
    @staticmethod
    def check_and_create_alerts(reading: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Check reading against thresholds and create alerts if needed"""
        alerts = []
        sensor_id = reading.get('sensor_id')
        reading_id = reading.get('id')
        
        # Check pH levels
        ph = reading.get('ph_level', 7.0)
        if ph > 8.5:
            alert = AlertService._create_alert(
                sensor_id=sensor_id,
                alert_type='ph_high',
                message=f'High pH detected: {ph:.2f} (safe range: 6.5-8.5)',
                severity='high',
                reading_id=reading_id
            )
            alerts.append(alert)
        
        elif ph < 6.5:
            alert = AlertService._create_alert(
                sensor_id=sensor_id,
                alert_type='ph_low',
                message=f'Low pH detected: {ph:.2f} (safe range: 6.5-8.5)',
                severity='high',
                reading_id=reading_id
            )
            alerts.append(alert)
        
        # Check TDS levels
        tds = reading.get('tds_level', 0)
        if tds > 500:
            alert = AlertService._create_alert(
                sensor_id=sensor_id,
                alert_type='tds_high',
                message=f'High TDS detected: {tds:.0f} ppm (safe: <500 ppm)',
                severity='high',
                reading_id=reading_id
            )
            alerts.append(alert)
        
        # Check turbidity
        turbidity = reading.get('turbidity', 0)
        if turbidity > 5:
            alert = AlertService._create_alert(
                sensor_id=sensor_id,
                alert_type='turbidity_high',
                message=f'High turbidity detected: {turbidity:.2f} NTU (safe: <5 NTU)',
                severity='medium',
                reading_id=reading_id
            )
            alerts.append(alert)
        
        # Check for anomalies
        if reading.get('is_anomaly', False):
            score = reading.get('anomaly_score', 0)
            alert = AlertService._create_alert(
                sensor_id=sensor_id,
                alert_type='anomaly',
                message=f'Anomalous reading detected (score: {score:.3f})',
                severity='high',
                reading_id=reading_id
            )
            alerts.append(alert)
        
        # Save alerts to database
        for alert in alerts:
            AlertService._save_alert(alert)
            AlertService._notify_users(alert)
        
        return alerts
    
    @staticmethod
    def _create_alert(
        sensor_id: str,
        alert_type: str,
        message: str,
        severity: str,
        reading_id: str = None
    ) -> Dict[str, Any]:
        """Create alert object"""
        return {
            'sensor_id': sensor_id,
            'alert_type': alert_type,
            'message': message,
            'severity': severity,
            'reading_id': reading_id,
            'is_acknowledged': False,
            'notified_via': [],
            'created_at': datetime.now().isoformat()
        }
    
    @staticmethod
    def _save_alert(alert: Dict[str, Any]) -> str:
        """Save alert to database"""
        alert_id = firebase_service.save_alert(alert)
        return alert_id
    
    @staticmethod
    def _notify_users(alert: Dict[str, Any]):
        """Send notifications through multiple channels"""
        notified = []
        
        # SMS notification for critical alerts
        if alert.get('severity') in ['high', 'critical']:
            AlertService._send_sms(alert)
            notified.append('sms')
        
        # Email notification
        AlertService._send_email(alert)
        notified.append('email')
        
        # Push notification
        AlertService._send_push_notification(alert)
        notified.append('push')
        
        alert['notified_via'] = notified
    
    @staticmethod
    def _send_sms(alert: Dict[str, Any]):
        """Send SMS alert (mock implementation)"""
        try:
            api_key = os.getenv('SMS_API_KEY')
            if api_key:
                # In production, use Twilio or similar
                print(f"[SMS] Alert sent: {alert['message']}")
        except Exception as e:
            print(f"Error sending SMS: {e}")
    
    @staticmethod
    def _send_email(alert: Dict[str, Any]):
        """Send email alert (mock implementation)"""
        try:
            print(f"[EMAIL] Alert sent: {alert['message']}")
        except Exception as e:
            print(f"Error sending email: {e}")
    
    @staticmethod
    def _send_push_notification(alert: Dict[str, Any]):
        """Send push notification (mock implementation)"""
        try:
            print(f"[PUSH] Alert sent: {alert['message']}")
        except Exception as e:
            print(f"Error sending push notification: {e}")
    
    @staticmethod
    def get_alerts(limit: int = 50) -> List[Dict[str, Any]]:
        """Get recent alerts"""
        return firebase_service.get_alerts(limit)
    
    @staticmethod
    def acknowledge_alert(alert_id: str):
        """Mark alert as acknowledged"""
        firebase_service.acknowledge_alert(alert_id)
