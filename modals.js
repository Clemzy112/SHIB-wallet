/* SHOW NETWORK MODAL */
function showNetworkModal(){

document
.getElementById("networkModal")
.classList
.remove("hidden");

}

/* CLOSE NETWORK MODAL */
function closeNetworkModal(){

document
.getElementById("networkModal")
.classList
.add("hidden");

}

/* OPEN ASSET MODAL */
function openAssetModal(symbol){

const token =
TOKENS.find(
t => t.symbol === symbol
);

if(!token){
return;
}

/* OPEN MODAL */
document
.getElementById("assetModal")
.classList
.remove("hidden");

/* TITLE */
document
.getElementById("assetTitle")
.innerText = token.name;

/* DEXSCREENER CHART */
document
.getElementById("chartFrame")
.src = token.chart;

}

/* CLOSE ASSET MODAL */
function closeAssetModal(){

document
.getElementById("assetModal")
.classList
.add("hidden");

}

/* OPEN RECEIVE MODAL */
function openReceiveModal(){

if(!userAddress){
return;
}

/* QR CODE */
const qr =

`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${userAddress}`;

/* SET QR */
document
.getElementById("qrCode")
.src = qr;

/* SHOW ADDRESS */
document
.getElementById("walletAddress")
.innerText = userAddress;

/* OPEN */
document
.getElementById("receiveModal")
.classList
.remove("hidden");

}

/* CLOSE RECEIVE MODAL */
function closeReceiveModal(){

document
.getElementById("receiveModal")
.classList
.add("hidden");

}

/* COPY ADDRESS */
function copyWalletAddress(){

navigator.clipboard.writeText(
userAddress
);

const btn =
document.getElementById(
"copyAddress"
);

btn.innerText = "Copied";

/* RESET */
setTimeout(()=>{

btn.innerText =
"Copy Address";

},2000);

}

/* OPEN PENDING MODAL */
function openPendingModal(){

document
.getElementById("pendingModal")
.classList
.remove("hidden");

}

/* CLOSE PENDING MODAL */
function closePendingModal(){

document
.getElementById("pendingModal")
.classList
.add("hidden");

}

/* BUTTON EVENTS */

/* NETWORK */
document
.getElementById("switchNetwork")
.onclick = switchNetwork;

document
.getElementById("cancelNetwork")
.onclick = ()=>{

disconnectWallet();

closeNetworkModal();

};

/* RECEIVE */
document
.getElementById("receiveBtn")
.onclick = openReceiveModal;

/* COPY */
document
.getElementById("copyAddress")
.onclick = copyWalletAddress;

/* PENDING */
document
.getElementById("viewPending")
.onclick = openPendingModal;

/* CLOSES */
document
.querySelector(".closeAsset")
.onclick = closeAssetModal;

document
.querySelector(".closeReceive")
.onclick = closeReceiveModal;

document
.querySelector(".closePending")
.onclick = closePendingModal;
