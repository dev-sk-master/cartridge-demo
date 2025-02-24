import { StarknetProvider } from './context/StarknetProvider'
import { ConnectWallet } from './components/ConnectWallet'
import { TransferEth } from './components/TransferEth'
import { StarknetCartridgeComponent } from './components/StarknetCartridgeComponent'
// import { useAccount, AccountProvider } from "./hooks/useAccount";
// import {
//   ACTIONS_ADDRESS,
//   RELAY_URL,
//   RPC_URL,
//   TORII_URL,
//   WORLD_ADDRESS,
// } from "./constants";

import { useState, useEffect, useRef } from "react";
import useStarknetStore from "./context/StarknetProvider"

function StarknetApp() {
  //const { account, openConnectionPage, address, clearSession, username } = useAccount();
  const [formData, setFormData] = useState({ recipient: '', amount: '' })
  console.log(account)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the appropriate field
    }));
  };

  // // Add this new function to handle claiming tokens
  // const handleTransfer = async () => {
  //   if (!account) {
  //     openConnectionPage();
  //     return;
  //   }

  //   try {
  //     const value = parseFloat(formData.amount); // Original value
  //     const decimals = 18; // Assuming 18 decimal places for precision

  //     // Convert to the smallest unit
  //     const smallestUnit = BigInt(value * 10 ** decimals); // Convert to BigInt to handle large numbers

  //     // Convert to hexadecimal
  //     const amountInHex = "0x" + smallestUnit.toString(16);



  //     const result = await account.execute_from_outside([
  //       {
  //         contractAddress: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
  //         entrypoint: 'transfer',
  //         calldata: [formData.recipient, amountInHex, "0x0"],
  //       }
  //     ])


  //     // await account.execute_from_outside([
  //     //   {
  //     //     calldata: [],
  //     //     entrypoint: "claim",
  //     //     contractAddress: ACTIONS_ADDRESS,
  //     //   },
  //     // ]);

  //     console.log(`Claimed `);
  //   } catch (error) {
  //     console.log(error)
  //     if (error.toString().includes("session/not-registered")) {
  //       // If the user is not registered, open the connection page
  //       openConnectionPage();
  //     } else if (error.toString().includes("exceeds balance") || error.toString().includes("Account balance is smaller than the transaction's max_fee") || error.toString().includes("Paymaster not supported") || error.toString().includes("ValidationFailure")) {
  //       console.log('no fund')
  //     } else {
  //       console.log("Failed to execute");
  //       console.log(error);
  //     }
  //   }
  // };

  // // Add this new function to handle claiming tokens
  // const handleTransaction = async () => {
  //   if (!account) {
  //     openConnectionPage();
  //     return;
  //   }

  //   try {

  //     const result = await account.execute_from_outside([
  //       {
  //         contractAddress: '0x02d2a4804f83c34227314dba41d5c2f8a546a500d34e30bb5078fd36b5af2d77',
  //         entrypoint: 'set_bet',
  //         calldata: [],
  //       }
  //     ])


  //     console.log(`Done `);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };

  return (
    <>
      <button onClick={openConnectionPage}>Connect</button>

      <p>Address: {address}</p>
      <p>Username: {username}</p>

      <button onClick={clearSession}>Disconnect</button>

      <br /><br />

      Recipient (in Hex):&nbsp;
      <input type='text' name="recipient"
        value={formData.recipient}
        onChange={handleChange} /><br /><br />

      Amount:&nbsp;
      <input type='text' name="amount"
        value={formData.amount}
        onChange={handleChange} /><br /><br />

      <button
        onClick={handleTransfer}
      > Transfer  </button>

      <br /><br />
      <button
        onClick={handleTransaction}
      > Tx Check  - Set bet</button>
    </>
  )
}

function App() {
  const { network, setNetwork } = useStarknetStore();


  return (<>
    {/* <StarknetCartridgeComponent /> */}

    <StarknetProvider>
      <h4>Current Network: {network}</h4>

      <label>
        Select Network:&nbsp;
      </label>
      <select
        onChange={(e) => setNetwork(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <option value="katana">Katana</option>
        <option value="sepolia">Sepolia</option>
        {/* <option value="mainnet">Mainnet</option> */}
      </select>
      <ConnectWallet />
      <TransferEth />
    </StarknetProvider>

    {/* <h4>Demo Setup</h4>
    <AccountProvider>
      <StarknetApp />
    </AccountProvider> */}
  </>
  );
}

export default App;
