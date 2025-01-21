# Cartridge Demo

A demo application available at:  
[https://shiny-twilight-288e10.netlify.app/](https://shiny-twilight-288e10.netlify.app/)


2. Open session controller page with user's public key

ControllerConnector opens popup to login/signup and connects an account.
const connector = new ControllerConnector({
    policies,
    rpc: 'https://api.cartridge.gg/x/starknet/sepolia',
})

But to use a Session controller tried with SessionConnector, but fails
import SessionConnector from "@cartridge/connector/session";

SessionController import is not available on installed version "@cartridge/controller": "^0.5.5"

3. Controller registers session public key and returns account info

 Expecting below function to be used to register, but right now ownerGuid and expiresAt etc is not available which has to be returned from SessionController
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


### `npm install --legacy-peer-deps`

### `npm start`

