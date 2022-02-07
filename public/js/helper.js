const abi = [
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_erc20_contract_address",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "TokensUnstaked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "tokensStaked",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "alreadyWithdrawn",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "contractBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "erc20Contract",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "initialTimestamp",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_timePeriodInSeconds",
                "type": "uint256"
            }
        ],
        "name": "setTimestamp",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "stakeTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "timePeriod",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "timestampSet",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferAccidentallyLockedTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "unstakeTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Address of the linear timelock instance
const staking_address = '0x3adbA9E6B5779A0B7B67B70B560B7C0605fecD8f';


// IMPORTANT - which address are you pasting here?
// THIS MUST BE THE ERC20 ADDRESS NOT THE TIMELOCK ADDRESS
const erc20_contract_address = '0xdA4ec2913Cf480fE923FC7a734c727f8543d50f7';

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

class Amounts {

    constructor() {
        this.locked = new ethers.BigNumber.from('0');
        this.withdrawn = new ethers.BigNumber.from('0');
        this.available = new ethers.BigNumber.from('0');
        this.cliffEdge = new ethers.BigNumber.from('0');
        this.releaseEdge = new ethers.BigNumber.from('0');
        this.currentTime = new ethers.BigNumber.from('0');
        this.netReleasePeriod = new ethers.BigNumber.from('0');
        this.mostRecentUnlockTimestamp = new ethers.BigNumber.from('0');
        this.weiPerSecond = new ethers.BigNumber.from('0');
    }

    getLocked() {
        return this.locked;
    }

    getWithdrawn() {
        return this.withdrawn;
    }

    getAvailable() {
        return this.available;
    }

    getCliffEdge() {
        return this.cliffEdge;
    }

    getReleaseEdge() {
        return this.releaseEdge;
    }

    getCurrentTime() {
        return this.currentTime;
    }

    getNetReleasePeriod() {
        return this.netReleasePeriod;
    }

    getMostRecentUnlockTimestamp() {
        return this.mostRecentUnlockTimestamp;
    }

    getWeiPerSecond() {
        return this.weiPerSecond;
    }

    setLocked(_locked) {
        this.locked = this.locked.add(_locked);
    }

    setWithdrawn(_withdrawn) {
        this.withdrawn = this.withdrawn.add(_withdrawn);
    }

    setAvailable(_available) {
        this.available = this.available.add(_available);
    }

    setCliffEdge(_cliffEdge) {
        this.cliffEdge = _cliffEdge;
    }

    setReleaseEdge(_releaseEdge) {
        this.releaseEdge = _releaseEdge;
    }

    setCurrentTime(_currentTime) {
        this.currentTime = _currentTime;
    }

    setNetReleasePeriod() {
        this.netReleasePeriod = this.releaseEdge.sub(this.cliffEdge);
    }

    setMostRecentUnlockTimestamp(_mostRecentUnlockTimestamp) {
        this.mostRecentUnlockTimestamp = _mostRecentUnlockTimestamp;
    }

    setWeiPerSecond(_weiPerSecond) {
        this.weiPerSecond = _weiPerSecond;
    }

    reset() {
        this.locked = new ethers.BigNumber.from('0');
        this.withdrawn = new ethers.BigNumber.from('0');
        this.available = new ethers.BigNumber.from('0');
        this.cliffEdge = new ethers.BigNumber.from('0');
        this.releaseEdge = new ethers.BigNumber.from('0');
        this.currentTime = new ethers.BigNumber.from('0');
        this.netReleasePeriod = new ethers.BigNumber.from('0');
        this.mostRecentUnlockTimestamp = new ethers.BigNumber.from('0');
        this.weiPerSecond = new ethers.BigNumber.from('0');
    }
}

var stakingAmounts = new Amounts();
var provider;
var signer;

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("Page has loaded ...");
    window.ethereum.enable();
    connectWallet().then(() => {
        console.log("Wallet connected in page load section");
        updateBalances().then(() => {
            console.log("Ready to unlock tokens ...")
        });
    });
});

async function connectWallet() {
    stakingAmounts.reset();
    window.ethereum.enable();
    console.log('Called connect wallet which is inside helper.js');
    provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);
    signer = provider.getSigner();
    console.log(signer);
    var addressOfSigner = await signer.getAddress();
    document.getElementById("eth_address").value = addressOfSigner;
    document.getElementById("connect_wallet_text").style.color = "#00FF7F";
    document.getElementById("connect_wallet_text").innerHTML = "Wallet connected ✔";

}

function clearInput() {
    document.getElementById("eth_address").value = '';
    document.getElementById("state_amount").value = '';
}

async function updateBalances() {
    stakingAmounts.reset();

    window.ethereum.enable();

    provider = new ethers.providers.Web3Provider(window.ethereum);

    // Current time
    var currentBlock = await provider.getBlock("latest");
    currentTime = currentBlock.timestamp;
    currentTimeBN = new ethers.BigNumber.from(currentTime);
    stakingAmounts.setCurrentTime(currentTimeBN);
    console.log("Current time: " + stakingAmounts.getCurrentTime());

    // Instantiate staking timelock contract
    stakingTimeLockContract = new ethers.Contract(staking_address, abi, provider);

    // Cliff edge timestamp
    cliffEdgeTimestamp = await stakingTimeLockContract.cliffEdge();
    cliffEdgeTimestampBN = new ethers.BigNumber.from(cliffEdgeTimestamp);
    stakingAmounts.setCliffEdge(cliffEdgeTimestampBN);

    // Release edge timestamp
    releaseEdgeTimestamp = await stakingTimeLockContract.releaseEdge();
    releaseEdgeTimestampBN = new ethers.BigNumber.from(releaseEdgeTimestamp);
    stakingAmounts.setReleaseEdge(releaseEdgeTimestampBN);

    // Net release period
    stakingAmounts.setNetReleasePeriod();

    // If we have not hit the unlock period then just send a message and end processing
    if (
        currentTime < cliffEdgeTimestamp) {
        console.log("No tokens available yet");
        var unlockCommences = new Date(cliffEdgeTimestamp * 1000);
        var toastResponse = JSON.stringify({
            avatar: "../images/favicon.ico",
            text: "Unlocking commences at: " + unlockCommences.toLocaleString(),
            duration: 10000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #FF6600, #FFA500)",
            stopOnFocus: false, // Prevents dismissing of toast on hover
            onClick: function() {} // Callback after click
        });
        var toastObject = JSON.parse(toastResponse);
        Toastify(toastObject).showToast();
    } else {
        // If we have entered the unlock period then go ahead and get the amounts first
        document.getElementById("pb").style.width = '0%';
        console.log("Disabling button");
        document.getElementById("button_calculate_balances").disabled = true;
        document.getElementById("button_calculate_balances").value = "Calculating balances, please wait ...";
        document.getElementById("pb").style.transition = "all 30s linear 0s";
        document.getElementById("pb").style.width = '80%';
        var toastResponse;

        // Eth address
        console.log("Calculating balances");
        eth_address = document.getElementById('eth_address').value;
        var pattern = /0x[a-fA-F0-9]{40}/;
        var resultRegex = pattern.exec(eth_address);
        if (resultRegex != null) {
            var recipientAddress = resultRegex[0];
            // Balance locked 
            stakingUsersBalance = await stakingTimeLockContract.balances(resultRegex[0]);
            stakingUsersBalanceBN = new ethers.BigNumber.from(stakingUsersBalance);
            stakingAmounts.setLocked(stakingUsersBalanceBN);
            console.log("User's balance: " + stakingAmounts.getLocked());

            // Amount already withdrawn
            stakingAlreadyWithdrawn = await stakingTimeLockContract.alreadyWithdrawn(resultRegex[0]);
            stakingAlreadyWithdrawnBN = new ethers.BigNumber.from(stakingAlreadyWithdrawn);
            stakingAmounts.setWithdrawn(stakingAlreadyWithdrawnBN);
            console.log("Already withdrawn: " + stakingAmounts.getWithdrawn());

            // Get most recent unlock timestamp i.e. the last time this specific user last unlocked tokens
            mostRecentUnlockTimestamp = await stakingTimeLockContract.mostRecentUnlockTimestamp(resultRegex[0]);
            mostRecentUnlockTimestampBN = new ethers.BigNumber.from(mostRecentUnlockTimestamp);
            stakingAmounts.setMostRecentUnlockTimestamp(mostRecentUnlockTimestampBN);
            console.log("Time of most recent unlock: " + stakingAmounts.getMostRecentUnlockTimestamp());

            // Populate UI with values
            console.log("Adding start:");
            console.log(stakingAmounts.getLocked());
            console.log("Adding end.");

            if (ethers.utils.formatEther(stakingAmounts.getLocked()) < 1 && ethers.utils.formatEther(stakingAmounts.getLocked()) > 0) {
                document.getElementById("locked").innerHTML = "< 1";
            } else {
                document.getElementById("locked").innerHTML = ethers.utils.formatEther(stakingAmounts.getLocked());
            }

            if (ethers.utils.formatEther(stakingAmounts.getWithdrawn()) < 1 && ethers.utils.formatEther(stakingAmounts.getWithdrawn()) > 0) {
                document.getElementById("withdrawn").innerHTML = "< 1";
            } else {
                document.getElementById("withdrawn").innerHTML = ethers.utils.formatEther(stakingAmounts.getWithdrawn());
            }
            // Calculate how many wei per second is available for this specific user
            stakingAmounts.setWeiPerSecond((stakingAmounts.getLocked().add(stakingAmounts.getWithdrawn())).div(stakingAmounts.getNetReleasePeriod()));
            console.log("Wei per second: " + stakingAmounts.getWeiPerSecond());

            // Calculate how many tokens are available, given the current time period and how much time has elapsed so far        
            if (stakingAmounts.getCurrentTime() >= stakingAmounts.getReleaseEdge()) {
                // The maximum time period has passed, so all locked tokens are available now and forever
                stakingAmounts.setAvailable(stakingAmounts.getLocked());
                console.log("No time lock in place, all tokens are available");
            } else {
                stakingAmounts.setAvailable((stakingAmounts.getCurrentTime().sub(stakingAmounts.getMostRecentUnlockTimestamp())).mul(stakingAmounts.getWeiPerSecond()));
            }
            if (ethers.utils.formatEther(stakingAmounts.getAvailable()) < 1 && ethers.utils.formatEther(stakingAmounts.getAvailable()) > 0) {
                document.getElementById("available").innerHTML = "< 1";
            } else {
                document.getElementById("available").innerHTML = ethers.utils.formatEther(stakingAmounts.getAvailable());
            }
            // Print value which will be written to state_amount input box
            //console.log("Max available: " + ethers.utils.formatUnits(available).toString());
            document.getElementById("state_amount").value = ethers.utils.formatUnits(stakingAmounts.getAvailable(), 0);
            document.getElementById("pb").style.transition = "all 0.1s linear 0s";
            document.getElementById("pb").style.width = '100%';
            sleep(1000).then(() => {
                document.getElementById("pb").classList.remove("progress-bar-animated");
                document.getElementById("button_calculate_balances").disabled = false;
                document.getElementById("button_calculate_balances").value = "Refresh/Calculate Balances";
                document.getElementById("pb").style.width = '0%';
            });
        } else {
            var toastResponse = JSON.stringify({
                avatar: "../images/favicon.ico",
                text: "Not a valid Ethereum address!",
                duration: 10000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #FF6600, #FFA500)",
                stopOnFocus: false, // Prevents dismissing of toast on hover
                onClick: function() {} // Callback after click
            });
            var toastObject = JSON.parse(toastResponse);
            Toastify(toastObject).showToast();
        }
    }
}

async function calculateBalances() {
    stakingAmounts.reset();
    await updateBalances();
}

async function onButtonClickTransfer() {
    stakingAmounts.reset();
    await updateBalances();
    // Provider
    window.ethereum.enable()
    provider = new ethers.providers.Web3Provider(window.ethereum);

    // Signer
    signer = provider.getSigner();
    console.log(signer);

    // Instantiate all 3 timelock contracts
    stakingTimeLockContract = new ethers.Contract(staking_address, abi, signer);

    // UI mods
    document.getElementById("pb").style.width = '0%';
    console.log("Disabling button");
    document.getElementById("button_transfer_tokens").disabled = true;
    document.getElementById("pb").style.transition = "all 30s linear 0s";
    document.getElementById("pb").style.width = '80%';

    // Init toast response
    var toastResponse;

    // Amount to unlock
    state_amount = document.getElementById('state_amount').value;

    // Ensure that state amount is a real number, if not then we skip everything and send a toast message 
    try {
        stateAmountInWei = new ethers.BigNumber.from(state_amount);
        console.log("Big Number: " + stateAmountInWei);
    } catch (err) {
        sleep(1000).then(() => {
            document.getElementById("pb").style.transition = "all 1s linear 0s";
            document.getElementById("pb").style.width = '100%';
            document.getElementById("pb").classList.remove("progress-bar-animated");
            document.getElementById("button_transfer_tokens").disabled = false;
            document.getElementById("pb").style.width = '0%';
        });
        var toastResponse = JSON.stringify({
            avatar: "../images/favicon.ico",
            text: "Token amount is not a valid number!",
            duration: 10000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #FF6600, #FFA500)",
            stopOnFocus: false, // Prevents dismissing of toast on hover
            onClick: function() {} // Callback after click
        });
        var toastObject = JSON.parse(toastResponse);
        Toastify(toastObject).showToast();
        console.log("Token amount is not a valid number");
        sleep(1000).then(() => {
            document.getElementById("pb").style.transition = "all 1s linear 0s";
            document.getElementById("pb").style.width = '100%';
            document.getElementById("pb").classList.remove("progress-bar-animated");
            document.getElementById("button_transfer_tokens").disabled = false;
            document.getElementById("pb").style.width = '0%';
        });
        throw "exit";
    }
    if (stateAmountInWei > 0 && stateAmountInWei <= stakingAmounts.getAvailable()) {
        eth_address = document.getElementById('eth_address').value;
        var pattern = /0x[a-fA-F0-9]{40}/;
        var resultRegex = pattern.exec(eth_address);
        if (resultRegex != null) {
            var recipientAddress = resultRegex[0];
            response = await stakingTimeLockContract.transferTimeLockedTokensAfterTimePeriod(erc20_contract_address, recipientAddress, stateAmountInWei);
            var toastResponse = JSON.stringify({
                avatar: "../images/favicon.ico",
                text: "Congratulations, tokens unlocked!",
                duration: 10000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #454A21, #607D3B)",
                stopOnFocus: false, // Prevents dismissing of toast on hover
                onClick: function() {} // Callback after click
            });
            var toastObject = JSON.parse(toastResponse);
            Toastify(toastObject).showToast();
        } else {
            var toastResponse = JSON.stringify({
                avatar: "../images/favicon.ico",
                text: "Not a valid Ethereum address!",
                duration: 10000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #FF6600, #FFA500)",
                stopOnFocus: false, // Prevents dismissing of toast on hover
                onClick: function() {} // Callback after click
            });
            var toastObject = JSON.parse(toastResponse);
            Toastify(toastObject).showToast();
        }
    } else {
        var toastResponse = JSON.stringify({
            avatar: "../images/favicon.ico",
            text: "Please re-check token amount and try again!",
            duration: 10000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #FF6600, #FFA500)",
            stopOnFocus: false, // Prevents dismissing of toast on hover
            onClick: function() {} // Callback after click
        });
        var toastObject = JSON.parse(toastResponse);
        Toastify(toastObject).showToast();
    }
    sleep(1000).then(() => {
        document.getElementById("pb").style.transition = "all 0.1s linear 0s";
        document.getElementById("pb").style.width = '100%';
        document.getElementById("pb").classList.remove("progress-bar-animated");
        document.getElementById("button_transfer_tokens").disabled = false;
        document.getElementById("pb").style.width = '0%';
    });
}