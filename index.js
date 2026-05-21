let provider;
let signer;
let userAddress;

const contractAddress = "0xBA426b6FD359d06230327e5B2cf02371FC700E05";

const abi = [
"function balanceOf(address owner) view returns (uint256)",
"function decimals() view returns (uint8)"
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

loadBalance();

}catch(err){

console.log(err);

alert("Connection failed");

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

const balance =
await contract.balanceOf(userAddress);

const formatted =
ethers.utils.formatUnits(balance, decimals);

document.getElementById("balance").innerText =
formatted + " SHHD";

}catch(err){

console.log(err);

alert("Balance error");

}

}
