# Cartridge Demo

A demo application available at:  
[https://shiny-twilight-288e10.netlify.app/](https://shiny-twilight-288e10.netlify.app/)

---

## Steps

1. **Generate local Stark key pair and store private key** - DONE

2. **Open session controller page with user's public key** - DONE

3. **Controller registers session public key and returns account info** - DONE

4. **Create controller session account on client** - DONE

5. **Store account info** - DONE

6. **Sign Transaction** - HELP

    ```javascript
    export const ETH_TOKEN_ADDRESS =
    '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'

    export const EXAMPLE_CONTRACT_ADDRESS = '0x02d2a4804f83c34227314dba41d5c2f8a546a500d34e30bb5078fd36b5af2d77'

    // Define session policies
    export const POLICIES = {
    contracts: {
        [ETH_TOKEN_ADDRESS]: {
        methods: [
            {
            name: "approve",
            entrypoint: "approve",
            description: "Approve spending of tokens",
            },
            { name: "transfer", entrypoint: "transfer" },
        ],
        },
        [EXAMPLE_CONTRACT_ADDRESS]: {
        methods: [
            { name: "set_bet", entrypoint: "set_bet", description: "Set Bet" },

        ],
        }
    },
    }
    ```

    **Example transaction:** 

    ```javascript    
    const result = await account.execute([
          {
            contractAddress: '0x02d2a4804f83c34227314dba41d5c2f8a546a500d34e30bb5078fd36b5af2d77',
            entrypoint: 'set_bet',
            calldata: [],
          },
        ]);
    ```

    **Error message:** 
    ```   
        error: {code: 63, message: "An unexpected error occurred",…}
        code: 63
        data: "Transaction must commit to pay a positive amount on fee."
        message: "An unexpected error occurred"
        id: 1
        jsonrpc: "2.0"
    ```

    
     ```javascript 
    const connector = new SessionConnector({
        policies: POLICIES,
        rpc: RPC_URL,
        chainId: constants.StarknetChainId.SN_SEPOLIA,
        redirectUrl: REDIRECT_URI,
    });

    const provider = jsonRpcProvider({
        rpc: () => ({ nodeUrl: RPC_URL }),
    });


    <StarknetConfig
        autoConnect
        chains={[mainnet, sepolia]}
        provider={provider}
        connectors={[connector]}
        explorer={starkscan}
    >
        {children}
    </StarknetConfig>

     ```

---

## Commands

### Install dependencies:

```bash
npm install --legacy-peer-deps

npm start




