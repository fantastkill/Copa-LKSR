export const parseLapTimeToSeconds = (value) => {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number' && Number.isFinite(value)) return value;

  const raw = String(value).trim();
  if (!raw) return null;

  if (/^\d+(\.\d+)?$/.test(raw)) {
    const seconds = Number(raw);
    return Number.isFinite(seconds) ? seconds : null;
  }

  const match = raw.match(/^(\d{1,2}):([0-5]?\d)(?:\.(\d{1,3}))?$/);
  if (!match) return null;

  const minutes = Number(match[1]);
  const seconds = Number(match[2]);
  const millis = Number((match[3] || '0').padEnd(3, '0').slice(0, 3));
  return minutes * 60 + seconds + millis / 1000;
};

export const formatLapTime = (value) => {
  if (value === null || value === undefined || value === '') return '--:--.---';
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed || '--:--.---';
  }

  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return '--:--.---';

  const totalMillis = Math.round(numeric * 1000);
  const minutes = Math.floor(totalMillis / 60000);
  const seconds = Math.floor((totalMillis % 60000) / 1000);
  const millis = totalMillis % 1000;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(millis).padStart(3, '0')}`;
};
