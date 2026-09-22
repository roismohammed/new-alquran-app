import { useEffect, useState, useCallback, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import { fetchPrayerTimes, calculateNextPrayer } from '../services/prayerService';
import { formatCountdown } from '../utils/formatters';

export function usePrayerTimes() {
  const { settings } = useSettings();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prayerCalculation, setPrayerCalculation] = useState(null);
  const [countdown, setCountdown] = useState({ digital: '00:00:00', human: '' });

  const loc = settings.location;
  const isGeo = loc?.isGeolocation;
  const lat = loc?.lat;
  const lng = loc?.lng;
  const city = loc?.city;
  const country = loc?.country;
  const method = settings.calculationMethod;

  const loadTimes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchPrayerTimes({
        latitude: isGeo ? lat : null,
        longitude: isGeo ? lng : null,
        city,
        country,
        method
      });
      setData(res);
      const calc = calculateNextPrayer(res?.timings);
      setPrayerCalculation(calc);
      if (calc) {
        setCountdown(formatCountdown(calc.remainingMs));
      }
    } catch (err) {
      setError('Jadwal sholat belum dapat dimuat.');
    } finally {
      setLoading(false);
    }
  }, [isGeo, lat, lng, city, country, method]);

  useEffect(() => {
    loadTimes();
  }, [loadTimes]);

  // 1-second realtime countdown tick
  useEffect(() => {
    if (!data?.timings) return;

    const interval = setInterval(() => {
      const calc = calculateNextPrayer(data.timings);
      setPrayerCalculation(calc);
      if (calc) {
        setCountdown(formatCountdown(calc.remainingMs));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  return {
    timings: data?.timings || null,
    hijriDate: data?.date?.hijri || null,
    nextPrayer: prayerCalculation?.nextPrayer || null,
    activePrayer: prayerCalculation?.activePrayer || null,
    allPrayers: prayerCalculation?.allPrayers || [],
    countdown,
    loading,
    error,
    refresh: loadTimes
  };
}
