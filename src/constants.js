export const TORII_URL = "https://api.cartridge.gg/x/beastslayers/torii";
export const RELAY_URL = "/ip4/127.0.0.1/udp/9091/webrtc-direct";
export const RPC_URL =
  "https://api.cartridge.gg/x/starknet/sepolia?paymaster=false";
export const KEYCHAIN_URL = "https://x.cartridge.gg";
export const REDIRECT_URI = window.location.origin;
export const WORLD_ADDRESS =
  "0x323701b21507b1557a8695c955561c27a2f3b1f3fa98a540b1f42c1933e4995";
export const ACTIONS_ADDRESS =
  "0x70fc96f845e393c732a468b6b6b54d876bd1a29e41a026e8b13579bf98eec8f";
export const THING_ADDRESS =
  "0x5a87c0b8a8e716af90ca250745be1a219475f316c299a87cd6d991d9f8bd5f7";

export const POLICIES = [
  // {
  //   target:
  //     "0x70fc96f845e393c732a468b6b6b54d876bd1a29e41a026e8b13579bf98eec8f",
  //   method: "attack",
  //   description: "Attack the beast",
  // },
  // {
  //   target:
  //     "0x70fc96f845e393c732a468b6b6b54d876bd1a29e41a026e8b13579bf98eec8f",
  //   method: "claim",
  //   description: "Claim your tokens",
  // },
  {
    target:
      "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
    method: "transfer",
    description: "Transfer",
  },
  {
    target: "0x02d2a4804f83c34227314dba41d5c2f8a546a500d34e30bb5078fd36b5af2d77",
    method: "set_bet",
    description: "set_bet",
  }
];