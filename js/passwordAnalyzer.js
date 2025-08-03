function liveAnalyzePassword() {
  const password = document.getElementById("passwordInput").value;
  const liveBar = document.getElementById("liveStrengthBar");
  const liveText = document.getElementById("liveStrengthText");

  if (!password) {
    liveBar.style.width = "0%";
    liveBar.style.backgroundColor = "transparent";
    liveText.textContent = "Start typing to see strength...";
    return;
  }

  const charsetSize = getCharsetSize(password);
  const totalCombos = Math.pow(charsetSize, password.length);
  const entropy = Math.log2(totalCombos);

  let strengthPercent = Math.min((entropy / 100) * 100, 100);
  liveBar.style.width = `${strengthPercent}%`;
  liveBar.style.backgroundColor = getBarColor(strengthPercent);

  // Friendly labels
  if (strengthPercent < 30) liveText.textContent = "Weak password";
  else if (strengthPercent < 60) liveText.textContent = "Moderate strength";
  else liveText.textContent = "Strong password";
}

function clickAnalyze() {
  const password = document.getElementById("passwordInput").value;
  const attackerType = document.getElementById("attackerType").value;

  const detailedSection = document.getElementById("detailedResult");
  const feedbackP = document.getElementById("detailedFeedback");
  const crackTimeSpan = document.getElementById("crackTimeText");
  const weaknessUl = document.getElementById("weaknessList");

  if (!password) {
    alert("Please enter a password first.");
    return;
  }

  const charsetSize = getCharsetSize(password);
  const totalCombos = Math.pow(charsetSize, password.length);
  const attackSpeed = getGuessesPerSecond(attackerType);
  const secondsToCrack = totalCombos / attackSpeed;

  // Friendly explanation of strength
  const weaknesses = getWeaknessReasons(password);
  const strong = weaknesses.length === 1 && weaknesses[0] === "No obvious weaknesses found.";

  feedbackP.textContent = strong
    ? "Your password is strong! It uses a good mix of characters and length."
    : "Your password could be improved. See details below.";

  crackTimeSpan.textContent = formatTime(secondsToCrack);

  // Fill weakness list
  weaknessUl.innerHTML = "";
  weaknesses.forEach(reason => {
    const li = document.createElement("li");
    li.textContent = reason;
    weaknessUl.appendChild(li);
  });

  detailedSection.classList.remove("hidden");
}
