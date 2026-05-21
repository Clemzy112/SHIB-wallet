const connectBtn =
document.getElementById("connectBtn");

const pendingBox =
document.getElementById("pendingBox");

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

async function onConnected(){

connectBtn.innerText = "Disconnect";

connectBtn.classList.remove("mainBtn");
connectBtn.classList.add("dangerBtn");

pendingBox.classList.remove("hidden");

await loadSHIBBalance();
await loadAssetBalances();
await loadTransactions();

}

function resetUI(){

connectBtn.innerText = "Connect DApp";

connectBtn.classList.remove("dangerBtn");
connectBtn.classList.add("mainBtn");

pendingBox.classList.add("hidden");

document.getElementById("shibBalance")
.innerText = "0 SHIB";

document.getElementById("shibUsd")
.innerText = "$0.00";

document.getElementById("assetList")
.innerHTML = "";

document.getElementById("txList")
.innerHTML = "";

}

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
