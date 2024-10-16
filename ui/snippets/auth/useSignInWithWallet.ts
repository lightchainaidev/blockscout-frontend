import { useWeb3Modal } from '@web3modal/wagmi/react';
import React from 'react';
import { useSignMessage } from 'wagmi';

import type { UserInfo } from 'types/api/account';

import config from 'configs/app';
import useApiFetch from 'lib/api/useApiFetch';
import getErrorMessage from 'lib/errors/getErrorMessage';
import getErrorObj from 'lib/errors/getErrorObj';
import useToast from 'lib/hooks/useToast';
import * as mixpanel from 'lib/mixpanel';
import useAccount from 'lib/web3/useAccount';

interface Props {
  onSuccess?: ({ address, profile }: { address: string; profile: UserInfo }) => void;
  onError?: () => void;
  source?: mixpanel.EventPayload<mixpanel.EventTypes.WALLET_CONNECT>['Source'];
  isAuth?: boolean;
}

function useSignInWithWallet({ onSuccess, onError, source = 'Login', isAuth }: Props) {
  const [ isPending, setIsPending ] = React.useState(false);
  const isConnectingWalletRef = React.useRef(false);

  const apiFetch = useApiFetch();
  const toast = useToast();
  const web3Modal = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const proceedToAuth = React.useCallback(async(address: string) => {
    try {
      const siweMessage = await apiFetch('auth_siwe_message', { queryParams: { address } }) as { siwe_message: string };
      const signature = await signMessageAsync({ message: siweMessage.siwe_message });
      const resource = isAuth ? 'auth_link_address' : 'auth_siwe_verify';
      const response = await apiFetch<typeof resource, UserInfo, unknown>(resource, {
        fetchParams: {
          method: 'POST',
          body: { message: siweMessage.siwe_message, signature },
        },
      });
      if (!('name' in response)) {
        throw Error('Something went wrong');
      }
      onSuccess?.({ address, profile: response });
    } catch (error) {
      const errorObj = getErrorObj(error);
      const shortMessage = errorObj && 'shortMessage' in errorObj && typeof errorObj.shortMessage === 'string' ? errorObj.shortMessage : undefined;
      onError?.();
      toast({
        status: 'error',
        title: 'Error',
        description: shortMessage || getErrorMessage(error) || 'Something went wrong',
      });
    } finally {
      setIsPending(false);
    }
  }, [ apiFetch, isAuth, onError, onSuccess, signMessageAsync, toast ]);

  const start = React.useCallback(() => {
    setIsPending(true);
    if (address) {
      proceedToAuth(address);
    } else {
      isConnectingWalletRef.current = true;
      web3Modal.open();
      mixpanel.logEvent(mixpanel.EventTypes.WALLET_CONNECT, { Source: source, Status: 'Started' });
    }
  }, [ address, proceedToAuth, source, web3Modal ]);

  React.useEffect(() => {
    if (address && isConnectingWalletRef.current) {
      isConnectingWalletRef.current = false;
      proceedToAuth(address);
      mixpanel.logEvent(mixpanel.EventTypes.WALLET_CONNECT, { Source: source, Status: 'Connected' });
    }
  }, [ address, isConnected, proceedToAuth, source ]);

  return React.useMemo(() => ({ start, isPending }), [ start, isPending ]);
}

function useSignInWithWalletFallback() {
  return React.useMemo(() => ({ start: () => {}, isPending: false }), [ ]);
}

export default config.features.blockchainInteraction.isEnabled ? useSignInWithWallet : useSignInWithWalletFallback;
