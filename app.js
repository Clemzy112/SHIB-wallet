/* CONNECT BUTTON */
const connectBtn =
document.getElementById(
"connectBtn"
);

/* PENDING BOX */
const pendingBox =
document.getElementById(
"pendingBox"
);

/* CONNECT / DISCONNECT */
connectBtn.addEventListener(
"click",
async ()=>{

if(!connected){

await connectWallet();

}else{

disconnectWallet();

}

}
);

/* AFTER CONNECT */
async function onConnected(){

/* BUTTON */
connectBtn.innerText =
"Disconnect";

connectBtn.classList.remove(
"mainBtn"
);

connectBtn.classList.add(
"dangerBtn"
);

/* SHOW PENDING */
pendingBox.classList.remove(
"hidden"
);

/* LOAD BALANCES */
await loadSHIBBalance();

/* LOAD OTHER TOKENS */
await loadAssetBalances();

/* LOAD TRANSACTIONS */
await loadTransactions();

}

/* RESET UI */
function resetUI(){

/* BUTTON */
connectBtn.innerText =
"Connect DApp";

connectBtn.classList.remove(
"dangerBtn"
);

connectBtn.classList.add(
"mainBtn"
);

/* HIDE PENDING */
pendingBox.classList.add(
"hidden"
);

/* RESET SHIB */
document.getElementById(
"shibBalance"
).innerText = "0 SHIB";

document.getElementById(
"shibUsd"
).innerText = "$0.00";

/* RESET TOKENS */
document.getElementById(
"assetList"
).innerHTML = "";

/* RESET TX */
document.getElementById(
"txList"
).innerHTML = "";

}

/* SEND BUTTON */
document
.getElementById("sendBtn")
.onclick = ()=>{

if(!connected){

alert(
"Connect wallet first"
);

return;

}

/*
Future:
Add real send transaction flow
*/

alert(
"Trust Wallet send flow ready"
);

};

/* AUTO RELOAD WHEN WALLET RETURNS */
window.addEventListener(
"focus",
()=>{

if(connected){

loadSHIBBalance();
loadAssetBalances();
loadTransactions();

}

}
);
