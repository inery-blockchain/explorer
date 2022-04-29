import { useEffect, useRef, useState, useContext } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCheck,
    faXmark
} from '@fortawesome/free-solid-svg-icons'
import { EndpointContext } from '../context/EndpointContextProvider'
import styles from '../styles/components/account.module.scss'

export default function Account({ num, prod }) {

    const [account, setAccount] = useState({}),
        [headBlockNum, setHeadBlockNum] = useState(0),
        [prodBlock, setProdBlock] = useState(0),
        [prodName, setProdName] = useState(''),
        [prodTime, setProdTime] = useState(0),
        [timestamp, setTimestamp] = useState('--:--:--'),
        [createdTime, setCreatedTime] = useState('Day, 00 Month 0000 00:00:00 GMT'),
        [isProducing, setIsProducing] = useState(false),
        [apiState, setApiState] = useContext(EndpointContext),
        nodeRef = useRef(null);

    useEffect(() => {

        let controller = new AbortController();

        async function fetchAccount() {

            try {

                const response = await fetch(`${apiState.isMainNet ? apiState.mainnet : apiState.testnet}/v1/chain/get_account`, {
                    method: 'POST',
                    body: JSON.stringify({
                        "account_name": prod
                    }),
                    signal: controller.signal
                }),
                    data = await response.json();
                setAccount(data);
                setCreatedTime(new Date(data?.created).toUTCString());
                controller = null;

            } catch (error) {

                console.warn;
            }
        };

        fetchAccount();

        return () => controller?.abort();

    }, [apiState.isMainNet, apiState.mainnet, apiState.testnet, prod]);

    useEffect(() => {

        let controller = new AbortController();

        async function fetchProdBlock() {

            try {

                if (headBlockNum === 0) {

                    const response = await fetch(`${apiState.isMainNet ? apiState.mainnet : apiState.testnet}/v1/chain/get_info`, {
                        signal: controller?.signal
                    });
                    const data = await response.json();
                    setHeadBlockNum(data.head_block_num);

                } else {

                    const response = await fetch(`${apiState.isMainNet ? apiState.mainnet : apiState.testnet}/v1/chain/get_block`, {
                        method: 'POST',
                        body: JSON.stringify({
                            "block_num_or_id": headBlockNum
                        }),
                        signal: controller?.signal
                    })
                    const data = await response.json();
                    if (data.producer == prod && data.transactions.length !== 0) {

                        setProdBlock(data.block_num);
                        setProdName(data.producer);
                        setProdTime(new Date(data.timestamp + 'Z').getTime());
                        setIsProducing(true);

                    } else {

                        setIsProducing(false);
                    }
                    setHeadBlockNum(headBlockNum + 1);
                }
                setLoading(false);
                controller = null;

            } catch (error) {

                console.warn;
            }
        }

        fetchProdBlock();

        return () => {

            controller?.abort();
        }

    }, [apiState.isMainNet, apiState.mainnet, apiState.testnet, headBlockNum, prod]);

    useEffect(() => {

        function interval() {

            const currentTime = new Date().getTime(),
                timeAgo = currentTime - prodTime,
                hours = Math.floor((timeAgo) / (h)),
                minutes = Math.floor((timeAgo % (h)) / (m)),
                seconds = Math.floor((timeAgo % (m)) / s);
            setTimestamp(`${hours === 0 && minutes === 0 && seconds < 5 ? 'Producing...' : hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
        }

        const s = 1000,
            m = 60 * s,
            h = 24 * m;

        if (prodName == prod) {

            const intervalID = setInterval(interval, 0);

            return () => clearInterval(intervalID);
        }

    }, [prod, prodBlock, prodName, prodTime]);

    useEffect(() => {

        const nodeChildRef = Object.values(nodeRef.current.children);

        if (isProducing == true) {

            nodeChildRef.forEach(el => el.classList.add(styles.ping));

        } else {

            nodeChildRef.forEach(el => el.classList.remove(styles.ping));
        }

    }, [isProducing]);

    return (

        <tr className={styles.account} ref={nodeRef}>
            <td>
                <span>
                    {num < 10 ? `0${num}` : num}
                </span>
            </td>
            <td>
                <span>
                    <Link href={{
                        pathname: '/accounts/account_info',
                        query: {
                            name: account?.account_name
                        }
                    }}>
                        <a>{account?.account_name}</a>
                    </Link>
                </span>
            </td>
            <td>
                <span className={styles.inlineHeader}>block</span>
                <span>{prodBlock ? prodBlock : 'Waiting...'}</span>
            </td>
            <td>
                <span className={styles.inlineHeader}>produced at</span>
                <span>{timestamp}</span>
            </td>
            <td>
                <span className={styles.inlineHeader}>created on</span>
                <span>{createdTime}</span>
            </td>
        </tr>
    )
}