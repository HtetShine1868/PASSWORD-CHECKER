function analyzePassword() {
  const password = document.getElementById("passwordInput").value;
  const attackerType = document.getElementById("attackerType").value;

  const { sets, charsetSize } = analyzeCharacterSet(password);
  const length = password.length;

  if (charsetSize === 0 || length === 0) {
    document.getElementById("result").innerHTML = `<p>Please enter a valid password.</p>`;
    return;
  }

  const totalCombinations = Math.pow(charsetSize, length);
  const entropy = calculateEntropy(charsetSize, length);
  const guessesPerSecond = attackerProfiles[attackerType].guessesPerSecond;
  const timeToCrack = totalCombinations / guessesPerSecond;

  const weaknesses = getWeaknessReasons(password, sets, length);

  document.getElementById("result").innerHTML = `
    <p><strong>Charset size:</strong> ${charsetSize}</p>
    <p><strong>Entropy:</strong> ${entropy.toFixed(2)} bits</p>
    <p><strong>Total combinations:</strong> ${totalCombinations.toExponential(2)}</p>
    <p><strong>Estimated time to crack:</strong> ${formatTime(timeToCrack)}</p>
    <p><strong>Weaknesses:</strong></p>
    <ul>${weaknesses.map(w => `<li>${w}</li>`).join('')}</ul>
  `;
}

function getWeaknessReasons(password, sets, length) {
  const reasons = [];
  if (length < 8) reasons.push("Too short (recommended: 8+ characters)");
  if (!sets.lowercase) reasons.push("No lowercase letters");
  if (!sets.uppercase) reasons.push("No uppercase letters");
  if (!sets.digits) reasons.push("No digits");
  if (!sets.symbols) reasons.push("No symbols or special characters");
  if (/^[a-zA-Z]+$/.test(password)) reasons.push("Only letters — add numbers or symbols");
  if (/(123|abc|password|qwerty)/i.test(password)) reasons.push("Contains common pattern (e.g., '123', 'password')");

  return reasons;
}

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
