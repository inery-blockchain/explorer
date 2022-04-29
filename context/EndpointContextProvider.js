import { useEffect, createContext, useReducer } from 'react'

export const EndpointContext = createContext();

export default function EndpointContextProvider(props) {

    const reducer = (state, action) => ({ ...state, ...action }),
        initialState = {
            isMainNet: null,
            mainnet: process.env.NEXT_PUBLIC_LINK_MAIN,
            testnet: process.env.NEXT_PUBLIC_LINK_TEST
        },
        [apiState, setApiState] = useReducer(reducer, initialState);

    useEffect(() => {

        const storageQuery = JSON.parse(localStorage.getItem('explorerEndpoint'));

        setApiState({ isMainNet: storageQuery === null ? false : storageQuery });

    }, []);

    useEffect(() => {

        if (apiState.isMainNet !== null) {

            localStorage.setItem('explorerEndpoint', JSON.stringify(apiState.isMainNet));
        }

    }, [apiState.isMainNet]);

    return <EndpointContext.Provider value={[apiState, setApiState]}>{props.children}</EndpointContext.Provider>
}