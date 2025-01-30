import { sepolia, mainnet } from "@starknet-react/chains";
import {
    StarknetConfig,
    jsonRpcProvider,
    starkscan,
} from "@starknet-react/core";
import ControllerConnector from "@cartridge/connector/controller";
import SessionConnector from "@cartridge/connector/session";
import { KEYCHAIN_URL, POLICIES, REDIRECT_URI, RPC_URL } from "../constants";
import { constants } from "starknet";



// Define your contract addresses
// const ETH_TOKEN_ADDRESS =
//     '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'

// // Define session policies
// const policies = {
//     contracts: {
//         [ETH_TOKEN_ADDRESS]: {
//             methods: [
//                 {
//                     name: "approve",
//                     entrypoint: "approve",
//                     description: "Approve spending of tokens",
//                 },
//                 { name: "transfer", entrypoint: "transfer" },
//             ],
//         },
//     },
// }

// Initialize the connector
// const connector = new ControllerConnector({
//     policies,
//     rpc: 'https://api.cartridge.gg/x/starknet/sepolia'    
// })

// // Configure RPC provider
// const provider = jsonRpcProvider({
//     rpc: (chain) => {
//         switch (chain) {
//             case mainnet:
//                 return { nodeUrl: 'https://api.cartridge.gg/x/starknet/mainnet' }
//             case sepolia:
//             default:
//                 return { nodeUrl: 'https://api.cartridge.gg/x/starknet/sepolia' }
//         }
//     },
// })

const connector = new SessionConnector({
    policies: POLICIES,
    rpc: RPC_URL,
    chainId: constants.StarknetChainId.SN_SEPOLIA,
    redirectUrl: REDIRECT_URI,
});

const provider = jsonRpcProvider({
    rpc: () => ({ nodeUrl: RPC_URL }),
});

export function StarknetProvider({ children }) {
    return (
        <StarknetConfig
            autoConnect
            chains={[mainnet, sepolia]}
            provider={provider}
            connectors={[connector]}
            explorer={starkscan}
        >
            {children}
        </StarknetConfig>
    )
}