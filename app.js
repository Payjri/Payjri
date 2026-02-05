const orderAmountInput = document.getElementById("orderAmount");
const advanceAmount = document.getElementById("advanceAmount");
const totalDue = document.getElementById("totalDue");
const ledgerList = document.getElementById("ledgerList");
const ledgerNote = document.getElementById("ledgerNote");
const addBlockButton = document.getElementById("addBlock");

const PLATFORM_FEE = 10;
let lastHash = "GENESIS";

const formatCurrency = (value) => `Nu. ${value.toLocaleString()}`;

const updateAdvance = () => {
  const amount = Number(orderAmountInput.value || 0);
  const half = Math.round(amount * 0.5);
  const total = half + PLATFORM_FEE;
  advanceAmount.textContent = formatCurrency(half);
  totalDue.textContent = formatCurrency(total);
};

const simpleHash = (input) => {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(8, "0");
};

const addBlock = () => {
  const note = ledgerNote.value.trim() || "Advance payment";
  const timestamp = new Date().toLocaleString();
  const payload = `${note}-${timestamp}-${lastHash}`;
  const hash = simpleHash(payload);

  const block = document.createElement("div");
  block.className = "block";
  block.innerHTML = `
    <strong>${note}</strong><br />
    <span>Timestamp: ${timestamp}</span><br />
    <span>Prev hash: ${lastHash}</span><br />
    <span>Hash: ${hash}</span>
  `;

  ledgerList.prepend(block);
  lastHash = hash;
  ledgerNote.value = "";
};

orderAmountInput.addEventListener("input", updateAdvance);
addBlockButton.addEventListener("click", addBlock);

updateAdvance();
addBlock();
