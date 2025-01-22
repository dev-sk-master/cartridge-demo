import { StarknetProvider } from './context/StarknetProvider'
import { ConnectWallet } from './components/ConnectWallet'
import { TransferEth } from './components/TransferEth'
import { useAccount, AccountProvider } from "./hooks/useAccount";
import {
  ACTIONS_ADDRESS,
  RELAY_URL,
  RPC_URL,
  TORII_URL,
  WORLD_ADDRESS,
} from "./constants";
import {  stark } from "starknet";


function StarknetApp() {
  const { account, openConnectionPage, address, clearSession, username } = useAccount();
  console.log(account)

  // Add this new function to handle claiming tokens
  const handleTransfer = async () => {
    if (!account) {
      openConnectionPage();
      return;
    }

    try {
      const result = await account.execute([
        {
          contractAddress: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
          entrypoint: 'transfer',
          calldata: ['0x0045BA78FdC5eD8B72a7a536F8aF5AF4A4255CBe4BA6FCa1B3D0BF49C0B833bF', '0x0'],
        }
      ])


      // await account.execute_from_outside([
      //   {
      //     calldata: [],
      //     entrypoint: "claim",
      //     contractAddress: ACTIONS_ADDRESS,
      //   },
      // ]);

      console.log(`Claimed `);
    } catch (error) {
      if (error.toString().includes("session/not-registered")) {
        // If the user is not registered, open the connection page
        openConnectionPage();
      } else if (error.toString().includes("exceeds balance") || error.toString().includes("Account balance is smaller than the transaction's max_fee") || error.toString().includes("Paymaster not supported") || error.toString().includes("ValidationFailure")) {
        console.log('no fund')
      } else {
        console.log("Failed to execute");
        console.error(error);
      }
    }
  };

  return (
    <>

      <button onClick={openConnectionPage}>Connect</button>

      <p>Address: {address}</p>
      <p>Username: {username}</p>

      <button onClick={clearSession}>Disconnect</button>

      <button
        onClick={handleTransfer}
      > Transfer  </button>
    </>
  )
}

function App() {



  return (<>
    {/* <StarknetProvider>
      <ConnectWallet />
      <TransferEth />
    </StarknetProvider> */}

    <h4>Demo Setup</h4>
    <AccountProvider>
      <StarknetApp />
    </AccountProvider>
  </>
  );
}

export default App;
