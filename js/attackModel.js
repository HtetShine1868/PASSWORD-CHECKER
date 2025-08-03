// attackModel.js

const attackerProfiles = {
  basic: {
    label: "Basic PC",
    guessesPerSecond: 1_000, // 1 thousand guesses/sec
  },
  advanced: {
    label: "Advanced GPU",
    guessesPerSecond: 1_000_000_000, // 1 billion guesses/sec
  },
  botnet: {
    label: "Botnet Network",
    guessesPerSecond: 100_000_000_000, // 100 billion guesses/sec
  }
};
