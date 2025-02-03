import { useAccount, useExplorer } from '@starknet-react/core'
import { useCallback, useState } from 'react'
import { ETH_TOKEN_ADDRESS, EXAMPLE_CONTRACT_ADDRESS } from "../constants";

// const ETH_CONTRACT =
//   '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'

export const TransferEth = () => {
  const [submitted, setSubmitted] = useState(false)
  const { account } = useAccount()
  const explorer = useExplorer()
  const [txnHash, setTxnHash] = useState()

  const execute = useCallback(
    async (amount) => {
      if (!account) return
      setSubmitted(true)
      setTxnHash(undefined)
      try {
        const result = await account.execute([
          {
            contractAddress: ETH_TOKEN_ADDRESS,
            entrypoint: 'approve',
            calldata: [account?.address, amount, '0x0'],
          },
          {
            contractAddress: ETH_TOKEN_ADDRESS,
            entrypoint: 'transfer',
            calldata: [account?.address, amount, '0x0'],
          },
        ])
        setTxnHash(result.transaction_hash)
      } catch (e) {
        console.error(e)
      } finally {
        setSubmitted(false)
      }
    },
    [account],
  )

  const handleTransaction = useCallback(
    async () => {
      if (!account) return;
      setSubmitted(true);
      setTxnHash(undefined);

      try {
        const result = await account.execute([
          {
            contractAddress: EXAMPLE_CONTRACT_ADDRESS,
            entrypoint: 'set_bet',
            calldata: [],
          },
        ]);

        setTxnHash(result.transaction_hash);
        console.log('Transaction successful');
      } catch (e) {
        console.error(e);
      } finally {
        setSubmitted(false);
      }
    },
    [account]
  );


  if (!account) return null

  return (
    <div>
      <h2>Tx Check</h2>
      <button
        // onClick={handleTransaction}
        onClick={() => handleTransaction()}
      > Set bet</button>

      <br />
      <h2>Transfer ETH</h2>
      <button onClick={() => execute('0x5AF3107A4000')} disabled={submitted}>
        Transfer 0.001 ETH
      </button>
      {txnHash && (
        <p>
          Transaction hash:{' '}
          <a
            href={explorer.transaction(txnHash)}
            target="blank"
            rel="noreferrer"
          >
            {txnHash}
          </a>
        </p>
      )}
    </div>
  )
}