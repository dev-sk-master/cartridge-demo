import { useAccount, useConnect, useDisconnect } from '@starknet-react/core'
import { useEffect, useState } from 'react'
import ControllerConnector from '@cartridge/connector/controller'
//import { Button } from '@cartridge/ui-next'
import { Account, constants, ec, json, stark, RpcProvider, hash, CallData } from 'starknet';

export function ConnectWallet() {
    const { connect, connectors } = useConnect()
    const { disconnect } = useDisconnect()
    const { address } = useAccount()
    const controller = connectors[0]
    const [username, setUsername] = useState()
    const [newAccount, setNewAccount] = useState()

    useEffect(() => {
        if (!address) return
        controller.username()?.then((n) => setUsername(n))
    }, [address, controller])


    const createNewAccount = () => {
        // new Open Zeppelin account v0.8.1
        // Generate public and private key pair.
        const privateKey = stark.randomAddress();
        console.log('New OZ account:\nprivateKey=', privateKey);
        const starkKeyPub = ec.starkCurve.getStarkKey(privateKey);
        console.log('publicKey=', starkKeyPub);

        const OZaccountClassHash = '0x061dac032f228abef9c6626f995015233097ae253a7f72d68552db02f2971b8f';
        // Calculate future address of the account
        const OZaccountConstructorCallData = CallData.compile({ publicKey: starkKeyPub });
        const OZcontractAddress = hash.calculateContractAddressFromHash(
            starkKeyPub,
            OZaccountClassHash,
            OZaccountConstructorCallData,
            0
        );
        console.log('Precalculated account address=', OZcontractAddress);
        setNewAccount({
            privateKey: privateKey,
            publicKey: starkKeyPub,
            address: OZcontractAddress
        })
    }

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

            <br /><br />
            <button onClick={() => createNewAccount()}>Create New Account</button>
            {newAccount ? <>
                <p>Private Key: {newAccount.privateKey}</p>
                <p>Public Key: {newAccount.publicKey}</p>
                <p>Address: {newAccount.address}</p>
            </> : null}
        </div>
    )
}