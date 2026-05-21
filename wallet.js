let provider;
let signer;
let userAddress;
let connected = false;

const ERC20_ABI = [

"function balanceOf(address owner) view returns (uint256)",

"function decimals() view returns (uint8)"

];

/* CONNECT WALLET */
async function connectWallet(){

try{

if(!window.ethereum){

alert("Open inside Trust Wallet browser");

return;

}

provider =
new ethers.providers.Web3Provider(window.ethereum);

await provider.send(
"eth_requestAccounts",
[]
);

const network =
await provider.getNetwork();

/* ETHEREUM MAINNET ONLY */
if(network.chainId !== 1){

showNetworkModal();

return;

}

signer =
provider.getSigner();

userAddress =
await signer.getAddress();

connected = true;

/* UPDATE UI */
onConnected();

/* LISTEN FOR NETWORK CHANGE */
window.ethereum.on(
"chainChanged",
handleChainChanged
);

/* LISTEN FOR ACCOUNT CHANGE */
window.ethereum.on(
"accountsChanged",
handleAccountsChanged
);

}catch(err){

console.log(err);

}

}

/* DISCONNECT */
function disconnectWallet(){

connected = false;

provider = null;
signer = null;
userAddress = null;

/* RESET UI */
resetUI();

}

/* SWITCH TO ETH MAINNET */
async function switchNetwork(){

try{

await window.ethereum.request({

method:
"wallet_switchEthereumChain",

params:[
{ chainId: "0x1" }
]

});

location.reload();

}catch(err){

console.log(err);

}

}

/* NETWORK CHANGED */
function handleChainChanged(){

location.reload();

}

/* ACCOUNT CHANGED */
function handleAccountsChanged(accounts){

if(accounts.length === 0){

disconnectWallet();

}else{

location.reload();

}

}

/* LOAD SHIB BALANCE */
async function loadSHIBBalance(){

try{

const shib =
TOKENS.find(
t => t.symbol === "SHIB"
);

const contract =
new ethers.Contract(
shib.address,
ERC20_ABI,
provider
);

const decimals =
await contract.decimals();

const balance =
await contract.balanceOf(
userAddress
);

const formatted =
ethers.utils.formatUnits(
balance,
decimals
);

/* SHOW SHIB BALANCE */
document.getElementById(
"shibBalance"
).innerText =

Number(formatted)
.toLocaleString()

+ " SHIB";

/* TEMP USD CALC */
const usd =
(
Number(formatted)
* 0.00001
).toFixed(2);

document.getElementById(
"shibUsd"
).innerText =

"$" + usd;

}catch(err){

console.log(err);

}

}

/* LOAD ALL TOKEN BALANCES */
async function loadAssetBalances(){

const assetList =
document.getElementById(
"assetList"
);

assetList.innerHTML = "";

/* LOOP TOKENS */
for(const token of TOKENS){

let balanceText = "0";

try{

/* ETH */
if(token.type === "native"){

const balance =
await provider.getBalance(
userAddress
);

balanceText =
ethers.utils.formatEther(
balance
);

}

/* ERC20 */
else{

const contract =
new ethers.Contract(
token.address,
ERC20_ABI,
provider
);

const decimals =
await contract.decimals();

const balance =
await contract.balanceOf(
userAddress
);

balanceText =
ethers.utils.formatUnits(
balance,
decimals
);

}

}catch(err){

console.log(err);

}

/* CREATE CARD */
assetList.innerHTML += `

<div
class="card assetCard"
onclick="openAssetModal('${token.symbol}')"
>

<div class="assetRow">

<div class="assetInfo">

<img
src="${token.logo}"
class="tokenLogo"
>

<div>

<h3>${token.symbol}</h3>

<p>
${Number(balanceText)
.toLocaleString()}
</p>

</div>

</div>

</div>

</div>

`;

}

}
