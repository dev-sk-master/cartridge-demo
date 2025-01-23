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

    **Example transaction:** 

    ```javascript    
    const result = await account.execute_from_outside([
        {
          contractAddress: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
          entrypoint: 'transfer',
          calldata: [recipient, amount],
        }
      ])
    ```

    **Error message:** 
    ```
    {
    "id": 1,
    "jsonrpc": "2.0",
    "error": {
        "code": 41,
        "message": "Transaction execution error",
        "data": {
            "execution_error": "0: Error in the called contract (contract address: 0x04570adf592949214b5ef52cbb882b1adf9213ff1a75b784f4bc4ca3592d32e6, class hash: 0x00e2eb8f5672af4e6a4e8a8f1b44989685e668489b0a25437733756c5a34a1d6, selector: 0x015d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad):\nError at pc=0:4302:\nCairo traceback (most recent call last):\nUnknown location (pc=0:290)\nUnknown location (pc=0:3037)\n\n1: Error in the called contract (contract address: 0x02afc32fed93f8242ce0ce983f7c21c57f731bd87aa40d46547f9d0b26be8d0b, class hash: 0x059e4405accdf565112fe5bf9058b51ab0b0e63665d280b816f9fe4119554b77, selector: 0x03dbc508ba4afd040c8dc4ff8a61113a7bcaf5eae88a6ba27b3c50578b3587e3):\nExecution failed. Failure reason: 0x73657373696f6e2f6e6f742d72656769737465726564 ('session/not-registered').\n",
            "transaction_index": 0
        }
    }
   }
    ```

    
     ```javascript 
     export const RPC_URL = "https://api.cartridge.gg/x/starknet/sepolia?paymaster=false";


    CartridgeSessionAccount.new_as_registered(
                RPC_URL,
                sessionSigner.privateKey,
                accountStorage.address,
                accountStorage.ownerGuid,
                Dojo.cairoShortStringToFelt("SN_SEPOLIA"),
                {
                    expiresAt: Number(accountStorage.expiresAt),
                    policies: POLICIES,
                }
            );
     ```

---

## Commands

### Install dependencies:

```bash
npm install --legacy-peer-deps

npm start




