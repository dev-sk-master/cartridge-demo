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
    export const POLICIES = [  
        {
            target:
            "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
            method: "transfer",
            description: "Transfer",
        },
    ];
    ```

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
    Error: Session policy not allowed error: Not allowed to call method selector `0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e` on contract `0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d`
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




