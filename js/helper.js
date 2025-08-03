function analyzeCharacterSet(password) {
  const sets = {
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    digits: /[0-9]/.test(password),
    symbols: /[^a-zA-Z0-9]/.test(password),
  };

  let charsetSize = 0;
  if (sets.lowercase) charsetSize += 26;
  if (sets.uppercase) charsetSize += 26;
  if (sets.digits) charsetSize += 10;
  if (sets.symbols) charsetSize += 33;

  return {
    sets,
    charsetSize,
  };
}

// Helper to format seconds into human-friendly text
function formatTime(seconds) {
  if (seconds < 1) return "less than a second";

  const units = [
    { label: "years", value: 31536000 },
    { label: "days", value: 86400 },
    { label: "hours", value: 3600 },
    { label: "minutes", value: 60 },
    { label: "seconds", value: 1 },
  ];

  for (let unit of units) {
    if (seconds >= unit.value) {
      return `${(seconds / unit.value).toFixed(2)} ${unit.label}`;
    }
  }

  return `${seconds.toFixed(2)} seconds`;
}

function getCharsetSize(password) {
  return analyzeCharacterSet(password).charsetSize;
}

function getGuessesPerSecond(attackerType) {
  return attackerProfiles[attackerType]?.guessesPerSecond || 1000;
}

function getWeaknessReasons(password) {
  const length = password.length;
  const { sets } = analyzeCharacterSet(password);
  const reasons = [];

  if (length === 0) return ["No password entered"];
  if (length < 8) reasons.push("Password is too short (minimum 8 characters recommended).");
  if (!sets.lowercase) reasons.push("Missing lowercase letters.");
  if (!sets.uppercase) reasons.push("Missing uppercase letters.");
  if (!sets.digits) reasons.push("Missing digits.");
  if (!sets.symbols) reasons.push("Missing symbols or special characters.");
  if (/^[a-zA-Z]+$/.test(password)) reasons.push("Only letters used, consider adding numbers or symbols.");
  if (/(123|abc|password|qwerty)/i.test(password)) reasons.push("Contains common weak patterns (e.g., '123', 'password').");

  return reasons.length ? reasons : ["No obvious weaknesses found."];
}

function getBarColor(percent) {
  if (percent < 30) return "#e74c3c";       // Red
  if (percent < 60) return "#f39c12";       // Orange
  if (percent < 85) return "#f1c40f";       // Yellow
  return "#2ecc71";                         // Green
}
