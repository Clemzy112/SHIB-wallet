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

const qr =
`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${userAddress}`;

document.getElementById("qrCode").src = qr;

document.getElementById("walletAddress").innerText = userAddress;

document.getElementById("receiveModal")
.classList.remove("hidden");

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
"0xAbc123...Manual"
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
"https://yourdomain.com/dashboard.html";

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
