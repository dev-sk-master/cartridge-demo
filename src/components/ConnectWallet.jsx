import { useAccount, useConnect, useDisconnect } from '@starknet-react/core'
import { useEffect, useState } from 'react'
//import ControllerConnector from '@cartridge/connector/controller'


export function ConnectWallet() {
    const { connect, connectors } = useConnect()
    // const { isConnected, connect, disconnect } = useSession();

    const { disconnect } = useDisconnect()
    const { address } = useAccount()

    const controller = connectors[0]
    const [username, setUsername] = useState()

    useEffect(() => {
        if (!address) return
        // controller.username()?.then((n) => setUsername(n))
    }, [address, controller])


    return (
        <div>


            {address && (
                <>
                    <p>Account: {address}</p>
                    {username && <p>Username: {username}</p>}
                </>
            )}
            {address ? (
                <button onClick={() => disconnect()}>Disconnect</button>
            ) : (
                <button onClick={() => connect({ connector: controller })}>
                    Connect
                </button>
            )}
        </div>
    )
}