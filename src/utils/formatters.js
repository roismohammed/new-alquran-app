// Convert Latin digits to Arabic numerals
export function toArabicNumerals(num) {
  if (num === undefined || num === null) return '';
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num)
    .split('')
    .map(char => {
      const parsed = parseInt(char, 10);
      return isNaN(parsed) ? char : arabicDigits[parsed];
    })
    .join('');
}

// Format seconds into MM:SS
export function formatAudioTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Format countdown remaining ms to HH:MM:SS or Indonesian string
export function formatCountdown(ms) {
  if (ms <= 0) return '00:00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    digital: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
    human: hours > 0
      ? `${hours} jam ${minutes} menit lagi`
      : `${minutes} menit ${seconds} detik lagi`
  };
}

// Copy text to clipboard safely
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    }
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
}

// Share text using Web Share API or fallback
export async function shareContent({ title, text, url = window.location.href }) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return true;
    } catch (err) {
      if (err.name !== 'AbortError') {
        return copyToClipboard(`${title}\n\n${text}\n\n${url}`);
      }
      return false;
    }
  } else {
    return copyToClipboard(`${title}\n\n${text}\n\n${url}`);
  }
}
