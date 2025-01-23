import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
//import { mockTelegramEnv, useCloudStorage, useLaunchParams, useMiniApp, useUtils } from "@telegram-apps/sdk-react";
import * as Dojo from "@dojoengine/torii-wasm";
import { KEYCHAIN_URL, POLICIES, REDIRECT_URI, RPC_URL } from "../constants";
import encodeUrl from "encodeurl";
import { CartridgeSessionAccount } from "@cartridge/account-wasm/session";

import { Account, constants, ec, json, stark, RpcProvider, hash, CallData } from 'starknet';

const storage = {
    get: (key) => {
        return new Promise((resolve) => {
            const value = localStorage.getItem(key);
            resolve(value ? JSON.parse(value) : null);
        });
    },
    set: (key, value) => {
        return new Promise((resolve) => {
            localStorage.setItem(key, JSON.stringify(value));
            resolve();
        });
    },
    delete: (key) => {
        return new Promise((resolve) => {
            localStorage.removeItem(key);
            resolve();
        });
    },
};

// Mocking Telegram environment if not present
// if (!window?.['Telegram']) {
//   mockTelegramEnv({
//     themeParams: {
//       accentTextColor: '#6ab2f2',
//       bgColor: '#17212b',
//       buttonColor: '#5288c1',
//       buttonTextColor: '#ffffff',
//       destructiveTextColor: '#ec3942',
//       headerBgColor: '#17212b',
//       hintColor: '#708499',
//       linkColor: '#6ab3f3',
//       secondaryBgColor: '#232e3c',
//       sectionBgColor: '#17212b',
//       sectionHeaderTextColor: '#6ab3f3',
//       subtitleTextColor: '#708499',
//       textColor: '#f5f5f5',
//     },
//     version: '7.2',
//     platform: 'tdesktop',
//   });
// }

const AccountContext = createContext(undefined);

export const AccountProvider = ({ children }) => {
    //const { initData } = useLaunchParams();
    const [initData, setInitData] = useState(null);
    //const storage = useCloudStorage();
    //const utils = useUtils();
    // const miniApp = useMiniApp();

    const [accountStorage, setAccountStorage] = useState();
    const [sessionSigner, setSessionSigner] = useState();

    useEffect(() => {
        // Get the 'startapp' parameter from the URL
        const queryParams = new URLSearchParams(window.location.search);
        const startApp = queryParams.get('startapp');
        setInitData(startApp);

    }, []);

    useEffect(() => {
        storage.get("sessionSigner").then((signer) => {
            if (signer) return setSessionSigner(JSON.parse(signer));

            const privateKey = stark.randomAddress();
            console.log('New OZ account:\nprivateKey=', privateKey);
            const publicKey = ec.starkCurve.getStarkKey(privateKey);
            console.log('publicKey=', publicKey);

            // const privateKey = Dojo.signingKeyNew();
            // const publicKey = Dojo.verifyingKeyNew(privateKey);

            const newSigner = { privateKey, publicKey };
            storage.set("sessionSigner", JSON.stringify(newSigner));
            setSessionSigner(newSigner);
        });

        storage.get("account").then((account) => {
            if (account) {
                const parsedAccount = JSON.parse(account);
                if (!parsedAccount.address || !parsedAccount.ownerGuid || !parsedAccount.expiresAt) {
                    return storage.delete("account");
                }
                setAccountStorage(parsedAccount);
            }
        });
    }, [storage]);

    useEffect(() => {
        if (!initData) return;

        const cartridgeAccount = JSON.parse(atob(initData));
        storage.set("account", JSON.stringify(cartridgeAccount));
        setAccountStorage(cartridgeAccount);
    }, [initData, storage]);

    const account = useMemo(() => {
        if (!accountStorage || !sessionSigner) return;
       
        return CartridgeSessionAccount.new_as_registered(
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
    }, [accountStorage, sessionSigner]);

    const openConnectionPage = () => {
        if (!sessionSigner) {
            const privateKey = stark.randomAddress();
            console.log('New OZ account:\nprivateKey=', privateKey);
            const publicKey = ec.starkCurve.getStarkKey(privateKey);
            console.log('publicKey=', publicKey);

            //   const privateKey = Dojo.signingKeyNew();
            //   const publicKey = Dojo.verifyingKeyNew(privateKey);

            const newSigner = { privateKey, publicKey };
            storage.set("sessionSigner", JSON.stringify(newSigner));
            setSessionSigner(newSigner);
            return;
        }

        window.location =
            encodeUrl(
                `${KEYCHAIN_URL}/session?public_key=${sessionSigner.publicKey}&redirect_uri=${REDIRECT_URI}&redirect_query_name=startapp&policies=${JSON.stringify(POLICIES)}&rpc_url=${RPC_URL}`
            )
            ;
        //miniApp.close();
    };

    const clearSession = () => {
        storage.delete("sessionSigner");
        storage.delete("account");
        setSessionSigner(undefined);
        setAccountStorage(undefined);
    };

    const value = {
        accountStorage,
        sessionSigner,
        account,
        openConnectionPage,
        clearSession,
        address: accountStorage?.address,
        username: accountStorage?.username,
    };

    return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
};

export const useAccount = () => {
    const context = useContext(AccountContext);
    if (context === undefined) {
        throw new Error('useAccount must be used within an AccountProvider');
    }
    return context;
};
