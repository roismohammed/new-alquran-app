import { useState, useEffect, useCallback } from 'react';
import { useSettings } from '../context/SettingsContext';
import { calculateQiblaAngle, calculateDistanceToKaaba } from '../utils/qiblaMath';

export function useQibla() {
  const { settings } = useSettings();
  const [qiblaAngle, setQiblaAngle] = useState(292); // Default ~292° for Indonesia
  const [distanceKm, setDistanceKm] = useState(8500);
  const [compassHeading, setCompassHeading] = useState(0); // 0 = North
  const [isCompassSupported, setIsCompassSupported] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(false);

  // Recalculate Qibla angle based on current settings location coordinates
  useEffect(() => {
    const lat = settings.location?.lat || -7.0455;
    const lng = settings.location?.lng || 112.7425;
    const angle = calculateQiblaAngle(lat, lng);
    const dist = calculateDistanceToKaaba(lat, lng);
    setQiblaAngle(angle);
    setDistanceKm(dist);
  }, [settings.location]);

  // Handle device orientation
  const handleOrientation = useCallback((event) => {
    let heading = null;

    if (event.webkitCompassHeading !== undefined) {
      // iOS devices
      heading = event.webkitCompassHeading;
    } else if (event.alpha !== null) {
      // Android / standard: absolute orientation
      if (event.absolute) {
        heading = 360 - event.alpha;
      } else {
        heading = 360 - event.alpha;
      }
    }

    if (heading !== null) {
      setCompassHeading(Math.round(heading));
    }
  }, []);

  const requestCompassPermission = async () => {
    try {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          setPermissionGranted(true);
          window.addEventListener('deviceorientation', handleOrientation, true);
          return true;
        } else {
          setPermissionGranted(false);
          return false;
        }
      } else {
        // Non-iOS or standard devices
        window.addEventListener('deviceorientationabsolute', handleOrientation, true);
        window.addEventListener('deviceorientation', handleOrientation, true);
        setPermissionGranted(true);
        return true;
      }
    } catch (err) {
      console.warn('Compass permission error:', err);
      setIsCompassSupported(false);
      return false;
    }
  };

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      // Check if permission already available
      if (typeof DeviceOrientationEvent.requestPermission !== 'function') {
        window.addEventListener('deviceorientationabsolute', handleOrientation, true);
        window.addEventListener('deviceorientation', handleOrientation, true);
        setPermissionGranted(true);
      }
    } else {
      setIsCompassSupported(false);
    }

    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [handleOrientation]);

  // Calculate needle offset: how far the phone is pointing from Qibla
  // When needleOffset is 0, user is directly facing Qibla!
  const needleOffset = (qiblaAngle - compassHeading + 360) % 360;
  const isFacingQibla = Math.abs(needleOffset < 180 ? needleOffset : 360 - needleOffset) <= 4;

  return {
    qiblaAngle,
    distanceKm,
    compassHeading,
    needleOffset,
    isFacingQibla,
    isCompassSupported,
    permissionGranted,
    requestCompassPermission
  };
}
