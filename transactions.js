async function loadTransactions(){

const txList = document.getElementById("txList");

txList.innerHTML = "";

if(!userAddress){
return;
}

try{

const response = await fetch(
`https://api.etherscan.io/api?module=account&action=txlist&address=${userAddress}&sort=desc`
);

const data = await response.json();

if(!data.result || data.result.length === 0){

txList.innerHTML = `
<div class="card">
No transactions found
</div>
`;

return;
}

const recent = data.result.slice(0,5);

recent.forEach(tx => {

const type =
(tx.to && tx.to.toLowerCase() === userAddress.toLowerCase())
? "Received"
: "Sent";

const ethValue = ethers.utils.formatEther(tx.value);

txList.innerHTML += `
<div class="card">

<div class="assetRow">
<div>
<h3>${type}</h3>
<p>${Number(ethValue).toFixed(4)} ETH</p>
</div>
</div>

<p style="font-size:12px;opacity:0.7;word-break:break-all;margin-top:10px;">
${tx.hash}
</p>

</div>
`;

});

}catch(err){
console.log(err);
}

}
