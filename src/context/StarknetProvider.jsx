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
import Controller from "@cartridge/controller";

import { create } from 'zustand'

// Zustand Store for Network & Connector State
const useStarknetStore = create((set) => ({
    network: "katana", // Default network
    connector: null,
    setNetwork: (value) => {
        const newConnector = createConnector(value);
        set({ network: value, connector: newConnector });
    },
}));


export default useStarknetStore;


// Define policies for each network
const policies = {   
    sepolia: {
        contracts: {
            ["0x02d2a4804f83c34227314dba41d5c2f8a546a500d34e30bb5078fd36b5af2d77"]: {
                methods: [
                    { name: "set_bet", entrypoint: "set_bet", description: "Set Bet" },
                ],
            },
        },
    },
    katana: {
        contracts: {
            ["0x7c0dd42dd8e7e948453bb8540977f1da32963be8f7c03962cdb2838a52263da"]: {
                methods: [
                    { name: "spawn_player", entrypoint: "spawn_player" },
                    { name: "set_current_beast", entrypoint: "set_current_beast" },
                    { name: "add_initial_food", entrypoint: "add_initial_food" },
                    { name: "spawn", entrypoint: "spawn" },
                    { name: "decrease_status", entrypoint: "decrease_status" },
                    { name: "feed", entrypoint: "feed" },
                    { name: "sleep", entrypoint: "sleep" },
                    { name: "awake", entrypoint: "awake" },
                    { name: "play", entrypoint: "play" },
                    { name: "pet", entrypoint: "pet" },
                    { name: "clean", entrypoint: "clean" },
                    { name: "revive", entrypoint: "revive" },
                    { name: "init_tap_counter", entrypoint: "init_tap_counter" },
                    { name: "tap", entrypoint: "tap" },
                ],
            },
        },
    },
};

// Define RPC URLs for each network
const RPC_URLS = {
    mainnet: "https://api.cartridge.gg/x/starknet/mainnet",
    sepolia: "https://api.cartridge.gg/x/starknet/sepolia",
    katana: "https://api.cartridge.gg/x/hhbb/katana",
};

// Function to Create a Connector Based on the Selected Network
const createConnector = (network) => {
    return new ControllerConnector({
        chains: [{ rpcUrl: RPC_URLS[network] }],
        defaultChainId:
            network === "mainnet"
                ? constants.StarknetChainId.SN_MAIN
                : network === "sepolia"
                    ? constants.StarknetChainId.SN_SEPOLIA
                    : "0x57505f48484242",
        policies: policies[network],
    });
};
// Initialize Default Connector for Zustand Store
useStarknetStore.setState({ connector: createConnector("katana") });



export function StarknetProvider({ children }) {
    const { network, connector } = useStarknetStore(); // Get current network from Zustand store
    const provider = jsonRpcProvider({
        rpc: () => ({ nodeUrl: RPC_URLS[network] }),
    });

    console.log('StarknetProvider', network, connector)


    return (
        <StarknetConfig
            autoConnect
            chains={[mainnet, sepolia]}
            provider={provider}
            //connectors={[cartridgeConnector]}
            connectors={[connector]}
            explorer={starkscan}
        >
            {children}
        </StarknetConfig>
    )
}