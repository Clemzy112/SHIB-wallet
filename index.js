let provider;
let signer;
let userAddress;

const contractAddress = "0xBA426b6FD359d06230327e5B2cf02371FC700E05";

const abi = [

"function balanceOf(address owner) view returns (uint256)",

"function decimals() view returns (uint8)",

"function symbol() view returns (string)"

];

async function connectWallet(){

try{

if(!window.ethereum){

alert("Open inside Trust Wallet browser");

return;

}

provider =
new ethers.providers.Web3Provider(window.ethereum);

await provider.send("eth_requestAccounts", []);

signer = provider.getSigner();

userAddress =
await signer.getAddress();

document.getElementById("walletAddress").innerText =
userAddress;

await checkNetwork();

await loadBalance();

}catch(err){

console.log(err);

alert(err.message);

}

}

async function checkNetwork(){

const network =
await provider.getNetwork();

if(network.chainId !== 11155111){

alert("Please switch to Sepolia network");

throw new Error("Wrong network");

}

}

async function loadBalance(){

try{

const contract =
new ethers.Contract(
contractAddress,
abi,
provider
);

const decimals =
await contract.decimals();

const symbol =
await contract.symbol();

const balance =
await contract.balanceOf(userAddress);

const formatted =
ethers.utils.formatUnits(balance, decimals);

document.getElementById("balance").innerText =
formatted + " " + symbol;

}catch(err){

console.log(err);

alert("Invalid Sepolia token contract");

}

}
