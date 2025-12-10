import { useSyncExternalStore } from 'react';


export function useIsHydrated() {
    return useSyncExternalStore(
        subscribe,
        () => true,
        () => false
    );
}

function subscribe() {
    return () => {};
}
