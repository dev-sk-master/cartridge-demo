import { StarknetProvider } from './context/StarknetProvider'
import { ConnectWallet } from './components/ConnectWallet'
import { TransferEth } from './components/TransferEth'
import { useAccount, AccountProvider } from "./hooks/useAccount";

function StarknetApp() {

  const { account, openConnectionPage, address, clearSession, username } = useAccount();
  return (
    <>
      <button onClick={openConnectionPage}>Connect</button>
    </>
  )
}

function App() {



  return (<>
    <StarknetProvider>
      <ConnectWallet />
      <TransferEth />
    </StarknetProvider>

    <h4>Demo Setup</h4>
    <AccountProvider>
      <StarknetApp />
    </AccountProvider>
  </>
  );
}

export default App;
