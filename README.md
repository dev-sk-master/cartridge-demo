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

    Example transaction

    ```javascript    
    await account.execute_from_outside([
        {
          calldata: [],
          entrypoint: "claim",
          contractAddress: ACTIONS_ADDRESS,
        },
      ]);
    ```

    **Error message** 
    paymaster not supported for this call or insufficient credits

     ```javascript 
     export const RPC_URL = "https://api.cartridge.gg/x/starknet/mainnet?paymaster=false";

    CartridgeSessionAccount.new_as_registered(
                RPC_URL,
                sessionSigner.privateKey,
                accountStorage.address,
                accountStorage.ownerGuid,
                Dojo.cairoShortStringToFelt("SN_MAIN"),
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




