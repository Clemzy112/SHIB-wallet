let provider;
let signer;
let userAddress;
let connected = false;

const ERC20_ABI = [
"function balanceOf(address owner) view returns (uint256)",
"function decimals() view returns (uint8)"
];

async function getPrices(){

const response = await fetch(
"https://api.coingecko.com/api/v3/simple/price?ids=ethereum,tether,shiba-inu&vs_currencies=usd"
);

return await response.json();

}

async function connectWallet(){

try{

if(!window.ethereum){
alert("Open inside Trust Wallet browser");
return;
}

provider = new ethers.providers.Web3Provider(window.ethereum);

await provider.send("eth_requestAccounts", []);

const network = await provider.getNetwork();

if(network.chainId !== 1){
showNetworkModal();
return;
}

signer = provider.getSigner();
userAddress = await signer.getAddress();
connected = true;

onConnected();

}catch(err){
console.log(err);
}

}

function disconnectWallet(){
connected = false;
provider = null;
signer = null;
userAddress = null;
resetUI();
}

async function switchNetwork(){

await window.ethereum.request({
method:"wallet_switchEthereumChain",
params:[{chainId:"0x1"}]
});

location.reload();

}

async function loadSHIBBalance(){

const prices = await getPrices();

const shib = TOKENS.find(t => t.symbol === "SHIB");

const contract = new ethers.Contract(
shib.address,
ERC20_ABI,
provider
);

const decimals = await contract.decimals();
const balance = await contract.balanceOf(userAddress);

const formatted = ethers.utils.formatUnits(balance, decimals);

const usd = (
Number(formatted) * prices["shiba-inu"].usd
).toFixed(2);

document.getElementById("shibBalance").innerText =
Number(formatted).toLocaleString() + " SHIB";

document.getElementById("shibUsd").innerText = "$" + usd;

}

async function loadAssetBalances(){

const prices = await getPrices();

const assetList = document.getElementById("assetList");
assetList.innerHTML = "";

for(const token of TOKENS){

let balanceText = "0";
let usdValue = "0.00";

if(token.type === "native"){

const balance = await provider.getBalance(userAddress);

balanceText = ethers.utils.formatEther(balance);

usdValue = (
Number(balanceText) * prices.ethereum.usd
).toFixed(2);

}else{

const contract = new ethers.Contract(
token.address,
ERC20_ABI,
provider
);

const decimals = await contract.decimals();
const balance = await contract.balanceOf(userAddress);

balanceText = ethers.utils.formatUnits(balance, decimals);

if(token.symbol === "USDT"){
usdValue = (
Number(balanceText) * prices.tether.usd
).toFixed(2);
}

if(token.symbol === "SHIB"){
usdValue = (
Number(balanceText) * prices["shiba-inu"].usd
).toFixed(2);
}

}

assetList.innerHTML += `
<div class="card assetCard" onclick="openAssetModal('${token.symbol}')">

<div class="assetRow">

<div class="assetInfo">
<img src="${token.logo}" class="tokenLogo">

<div>
<h3>${token.symbol}</h3>
<p>${Number(balanceText).toLocaleString()}</p>
<p style="color:#00ff88;">$${usdValue}</p>
</div>

</div>

</div>

<div class="buttonRow">
<button class="actionBtn">Send</button>
<button class="actionBtn">Receive</button>
</div>

</div>
`;

}

}
