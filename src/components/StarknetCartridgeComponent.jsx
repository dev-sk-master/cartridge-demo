import React, { useState } from "react";
import SessionConnector from "@cartridge/connector/session";
import { constants } from "starknet";
import { KEYCHAIN_URL, POLICIES, REDIRECT_URI, RPC_URL } from "../constants";

const STRK_CONTRACT_ADDRESS = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";

export const StarknetCartridgeComponent = () => {
    const [account, setAccount] = useState(null);
    const [transactionHash, setTransactionHash] = useState(null);
    const [error, setError] = useState(null);

    const provider = new SessionConnector({
        // rpc: "https://api.cartridge.gg/x/starknet/sepolia",
        // chainId: constants.StarknetChainId.SN_SEPOLIA,
        // policies: {
        //   contracts: {
        //     [STRK_CONTRACT_ADDRESS]: {
        //       methods: [
        //         { name: "approve", entrypoint: "approve", description: "Approve spending of tokens" },
        //         { name: "transfer", entrypoint: "transfer" },
        //       ],
        //     },
        //   },
        // },

        policies: POLICIES,
        rpc: RPC_URL,
        chainId: constants.StarknetChainId.SN_SEPOLIA,
        redirectUrl: REDIRECT_URI,


    });

    const connectWallet = async () => {
        try {
            const userAccount = await provider.connect();
            setAccount(userAccount);
            console.log("Connected account:", userAccount.address);
        } catch (err) {
            console.error("Connection error:", err);
            setError(err.message);
        }
    };

    const sendTransaction = async () => {
        if (!account) {
            setError("Please connect your wallet first.");
            return;
        }

        try {
            //   const recipient = account.address; // Replace with recipient address
            //   const amount = "0x1"; // Replace with desired amount

            //   const result = await account.execute([
            //     {
            //       contractAddress: STRK_CONTRACT_ADDRESS,
            //       entrypoint: "transfer",
            //       calldata: [recipient, amount, "0x0"],
            //     },
            //   ]);

            const result = await account.execute([
                {
                    contractAddress: EXAMPLE_CONTRACT_ADDRESS,
                    entrypoint: 'set_bet',
                    calldata: []
                },
            ]);

            setTransactionHash(result.transaction_hash);
            console.log("Transaction sent, hash:", result.transaction_hash);
        } catch (err) {
            const controllerError = err;
            setError(controllerError.message || "Transaction failed");
            console.error("Transaction error:", controllerError);
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-bold">Starknet Cartridge Controller</h2>
            <button onClick={connectWallet} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                Connect Wallet
            </button>
            {account && <p className="mt-2">Connected: {account.address}</p>}

            <button onClick={sendTransaction} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg">
                Send Transaction
            </button>
            {transactionHash && <p className="mt-2">Transaction Hash: {transactionHash}</p>}
            {error && <p className="mt-2 text-red-500">Error: {error}</p>}
        </div>
    );
};


