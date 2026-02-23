import random
from datetime import datetime, timedelta
import requests
import time
import os
from typing import Dict, Any
import json

class SensorSimulator:
    """Simulate IoT sensors (ESP32) with realistic water quality data"""
    
    def __init__(self, device_id: str, location: str, device_type: str = "overhead_tank"):
        self.device_id = device_id
        self.location = location
        self.device_type = device_type
        self.sensor_id = None
        
        # Normal water quality parameters
        self.ph_baseline = 7.0
        self.tds_baseline = 200
        self.turbidity_baseline = 1.0
        self.temperature = 25
        
    def register_sensor(self, api_url: str = "http://localhost:8000") -> bool:
        """Register sensor with backend"""
        try:
            response = requests.post(
                f"{api_url}/api/sensors",
                json={
                    "name": f"Sensor-{self.device_id}",
                    "location": self.location,
                    "device_type": self.device_type
                },
                timeout=5
            )
            if response.status_code == 200:
                data = response.json()
                self.sensor_id = data.get('id')
                print(f"✓ Sensor {self.device_id} registered with ID: {self.sensor_id}")
                return True
            else:
                print(f"✗ Failed to register sensor: {response.status_code}")
                return False
        except Exception as e:
            print(f"✗ Error registering sensor: {e}")
            return False
    
    def generate_reading(self, anomaly_injection: float = 0.0) -> Dict[str, Any]:
        """
        Generate realistic sensor reading
        anomaly_injection: 0.0-1.0 chance of generating anomalous reading
        """
        # Check if we should inject anomaly
        if random.random() < anomaly_injection:
            # Generate anomalous values
            ph = random.uniform(5.0, 9.5)
            tds = random.uniform(300, 800)
            turbidity = random.uniform(5, 15)
        else:
            # Small random variations from baseline (normal operation)
            ph = self.ph_baseline + random.uniform(-0.5, 0.5)
            tds = self.tds_baseline + random.uniform(-30, 30)
            turbidity = max(0, self.turbidity_baseline + random.uniform(-0.2, 0.2))
        
        # Clamp values to reasonable ranges
        ph = max(0, min(14, ph))
        tds = max(0, tds)
        turbidity = max(0, turbidity)
        
        return {
            'sensor_id': self.sensor_id,
            'ph_level': round(ph, 2),
            'tds_level': round(tds, 1),
            'turbidity': round(turbidity, 2),
            'temperature': self.temperature
        }
    
    def submit_reading(self, api_url: str = "http://localhost:8000") -> bool:
        """Submit reading to backend"""
        if not self.sensor_id:
            print("✗ Sensor not registered")
            return False
        
        reading = self.generate_reading(anomaly_injection=0.05)  # 5% anomaly rate
        
        try:
            response = requests.post(
                f"{api_url}/api/readings",
                json=reading,
                timeout=5
            )
            if response.status_code == 200:
                data = response.json()
                status = "⚠️ ANOMALY" if data.get('is_anomaly') else "✓"
                print(f"{status} Reading from {self.location}: pH={reading['ph_level']}, TDS={reading['tds_level']}, Turbidity={reading['turbidity']}")
                return True
            else:
                print(f"✗ Failed to submit reading: {response.status_code}")
                return False
        except Exception as e:
            print(f"✗ Error submitting reading: {e}")
            return False


class SimulatorManager:
    """Manage multiple sensor simulators"""
    
    def __init__(self, num_devices: int = 3, api_url: str = "http://localhost:8000"):
        self.num_devices = num_devices
        self.api_url = api_url
        self.sensors = []
        self._create_sensors()
    
    def _create_sensors(self):
        """Create simulated sensors"""
        device_configs = [
            {
                'location': 'Overhead Tank - Main House',
                'device_type': 'overhead_tank'
            },
            {
                'location': 'Kitchen Tap - Ground Floor',
                'device_type': 'kitchen_tap'
            },
            {
                'location': 'Underground Tank - Basement',
                'device_type': 'underground_tank'
            }
        ]
        
        for i, config in enumerate(device_configs[:self.num_devices]):
            sensor = SensorSimulator(
                device_id=f"ESP32-{i+1:03d}",
                location=config['location'],
                device_type=config['device_type']
            )
            self.sensors.append(sensor)
    
    def initialize(self) -> bool:
        """Initialize all sensors"""
        print("\n" + "="*60)
        print("IoT SENSOR SIMULATOR - Water Quality Monitoring")
        print("="*60 + "\n")
        
        all_registered = True
        for sensor in self.sensors:
            if not sensor.register_sensor(self.api_url):
                all_registered = False
        
        return all_registered
    
    def run_continuous(self, interval: int = 10, duration: int = None):
        """
        Run sensors continuously
        
        Args:
            interval: Seconds between readings
            duration: Total duration in seconds (None = infinite)
        """
        if not all(s.sensor_id for s in self.sensors):
            print("✗ Not all sensors initialized")
            return
        
        print(f"\n📊 Starting continuous simulation...")
        print(f"   Interval: {interval}s per reading")
        if duration:
            print(f"   Duration: {duration}s total")
        print("   Press Ctrl+C to stop\n")
        
        start_time = datetime.now()
        
        try:
            while True:
                # Check if duration exceeded
                if duration:
                    elapsed = (datetime.now() - start_time).total_seconds()
                    if elapsed > duration:
                        break
                
                # Submit readings from all sensors
                for sensor in self.sensors:
                    sensor.submit_reading(self.api_url)
                
                # Wait before next batch
                time.sleep(interval)
        
        except KeyboardInterrupt:
            print("\n\n✓ Simulation stopped by user")
        except Exception as e:
            print(f"\n✗ Error during simulation: {e}")
    
    def run_batch(self, num_readings: int = 10, interval: int = 5):
        """
        Run batch simulation
        
        Args:
            num_readings: Number of readings per sensor
            interval: Seconds between readings
        """
        if not all(s.sensor_id for s in self.sensors):
            print("✗ Not all sensors initialized")
            return
        
        print(f"\n📊 Running batch simulation ({num_readings} readings per sensor)...")
        print()
        
        try:
            for i in range(num_readings):
                print(f"[Reading {i+1}/{num_readings}]")
                for sensor in self.sensors:
                    sensor.submit_reading(self.api_url)
                
                if i < num_readings - 1:
                    time.sleep(interval)
            
            print("\n✓ Batch simulation completed")
        except Exception as e:
            print(f"\n✗ Error during simulation: {e}")


def main():
    """Main entry point"""
    # Get configuration from environment
    api_url = os.getenv('BACKEND_URL', 'http://localhost:8000')
    num_devices = int(os.getenv('NUM_SIMULATED_DEVICES', 3))
    simulation_type = os.getenv('SIMULATION_TYPE', 'continuous')  # continuous or batch
    interval = int(os.getenv('SIMULATION_INTERVAL', 10))  # seconds
    
    # Create manager
    manager = SimulatorManager(num_devices=num_devices, api_url=api_url)
    
    # Initialize sensors
    if not manager.initialize():
        print("\n✗ Failed to initialize sensors")
        return
    
    # Run simulation
    if simulation_type == 'batch':
        manager.run_batch(num_readings=20, interval=interval)
    else:
        manager.run_continuous(interval=interval)


if __name__ == "__main__":
    main()
