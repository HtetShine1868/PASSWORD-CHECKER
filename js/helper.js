// helpers.js

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
  if (sets.symbols) charsetSize += 33; // estimated common symbols

  return {
    sets,
    charsetSize,
  };
}

function calculateEntropy(charsetSize, length) {
  return Math.log2(Math.pow(charsetSize, length));
}
