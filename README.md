# Cartridge Demo

A demo application available at:  
[https://shiny-twilight-288e10.netlify.app/](https://shiny-twilight-288e10.netlify.app/)

---

## Steps

1. **Generate local Stark key pair and store private key** - DONE

2. **Open session controller page with user's public key** - HELP

    `ControllerConnector` opens a popup to login/signup and connects an account.

    ```javascript
    const connector = new ControllerConnector({
        policies,
        rpc: 'https://api.cartridge.gg/x/starknet/sepolia',
    });
    ```

    However, to use a session controller, I tried with `SessionConnector`, but it fails.

    ```javascript
    import SessionConnector from "@cartridge/connector/session";
    ```

    Note: `SessionController` import is not available in the installed version `"@cartridge/controller": "^0.5.5"`

3. **Controller registers session public key and returns account info** - HELP

    Expecting the following function to be used for registration. However, fields like `ownerGuid` and `expiresAt` are currently unavailable but need to be returned from `SessionController`.

    ```javascript
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

4. **Create controller session account on client** - TODO

5. **Store account info** - TODO

---

## Commands

### Install dependencies:

```bash
npm install --legacy-peer-deps

npm start




