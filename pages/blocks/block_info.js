import { Fragment, useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCode,
    faDiceD6,
    faGears,
    faUser,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import Navbar from '../../components/Navbar'
import Stats from '../../components/Stats'
import BlockTrx from '../../components/BlockTrx'
import { EndpointContext } from '../../context/EndpointContextProvider'
import styles from '../../styles/blockinfo.module.css'

export default function BlockInfo() {

    const router = useRouter(),
        [networkError, setNetworkError] = useState(false),
        [hash, setHash] = useState(<>&nbsp;</>),
        [num, setNum] = useState(<>&nbsp;</>),
        [prod, setProd] = useState(<>&nbsp;</>),
        [spawn, setSpawnTime] = useState(<>&nbsp;</>),
        [trxList, setTrxList] = useState([]),
        [isNotFound, setIsNotFound] = useState(false),
        [timestamp, setTimeStamp] = useState(<>&nbsp;</>),
        [apiState, setApiState] = useContext(EndpointContext);

    useEffect(() => {

        let controller = new AbortController();

        async function fetchData() {

            try {

                if (router.isReady === true) {

                    const response = await fetch(`${apiState.isMainNet ? apiState.mainnet : apiState.testnet}/v1/chain/get_block`, {
                        method: 'POST',
                        body: JSON.stringify({
                            "block_num_or_id": router.query.num
                        }),
                        signal: controller.signal
                    })
                    if (response.status !== 200) {
                        setIsNotFound(true);
                    }
                    const data = await response.json();
                    setSpawnTime(data.timestamp + 'Z');
                    setHash(data.id);
                    setNum(data.block_num);
                    setProd(data.producer);
                    if (data.transactions.length !== 0) {
                        setTrxList(data.transactions);
                    }
                    controller = null;
                }

            } catch (error) {

                console.warn(error);

                /**setNetworkError(true);*/
            }
        }

        fetchData();

        return () => {

            controller?.abort();
        };

    }, [apiState.isMainNet, apiState.mainnet, apiState.testnet, router.isReady, router.query.num]);

    useEffect(() => {

        const timer = setInterval(() => {

            const s = 1000,
                m = s * 60,
                h = m * 60,
                d = h * 24,

                origin = new Date(spawn).getTime(),
                now = new Date().getTime(),
                elapsed = now - origin,

                days = Math.floor(elapsed / (d)),
                hours = Math.floor((elapsed % (d)) / (h)),
                minutes = Math.floor((elapsed % (h)) / (m)),
                seconds = Math.floor((elapsed % (m)) / s);

            if (days === 0) {
                setTimeStamp(`${(hours < 10 ? '0' + hours : hours)}:${(minutes < 10 ? '0' + minutes : minutes)}:${(seconds < 10 ? '0' + seconds : seconds)}`);
            } else if (days === 1) {
                setTimeStamp('Yesterday');
            } else if (days < 7) {
                setTimeStamp(`${days} days ago`);
            } else if (days === 7) {
                setTimeStamp('A week ago');
            } else if (days < 31) {
                setTimeStamp('More than a week ago');
            } else if (days === 31) {
                setTimeStamp('A month ago');
            } else if (days < 128) {
                setTimeStamp('More than a month ago');
            } else if (days === 128) {
                setTimeStamp('Half a year ago');
            } else if (days < 365) {
                setTimeStamp('More than half a year ago');
            } else if (days === 365) {
                setTimeStamp('A year ago');
            } else if (365 < days) {
                setTimeStamp('Over a year ago');
            }
        }, 0);

        return () => clearInterval(timer);

    }, [spawn]);

    return (

        <Fragment>

            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Block Information | Explorer</title>
            </Head>

            {
                networkError === true ? <div id='error'>Whoops, something went wrong - please check your internet connection. <button onClick={router.reload}>reload</button></div> : <Layout>

                    <div className={`container`}>

                        <div className={`row`}>

                            <div className={`col-12`}>

                                <Stats />

                            </div>

                            <h2 id={styles.title} className={`col-12`}>block information</h2>

                            <div className={`col-12`}>

                                <Navbar />

                            </div>

                            <div className={`col-12`}>

                                <section id={styles.trxTable} className={styles.section}>
                                    <div>
                                        <span>
                                            <span>block hash:</span><hr />
                                        </span>
                                        <span>{hash}</span>
                                    </div>
                                    <div>
                                        <span>
                                            <span>block num:</span><hr />
                                        </span>
                                        <span>{num}</span>
                                    </div>
                                    <div>
                                        <span>
                                            <span>master node:</span><hr />
                                        </span>
                                        <span>
                                            <Link href={{
                                                pathname: `/accounts/account_info`,
                                                query: {
                                                    name: prod
                                                }
                                            }}>
                                                <a>
                                                    <span>
                                                        {prod}
                                                    </span>
                                                </a>
                                            </Link>
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <span>time:</span><hr />
                                        </span>
                                        <span>{timestamp}</span>
                                    </div>
                                </section>

                            </div>

                            <h2 id={styles.title} className={`col-12`}>transaction list</h2>

                            <div className={`col-12`}>

                                <Table
                                    trim={0}
                                    header={

                                        [
                                            {
                                                title: 'block',
                                                icon: faDiceD6
                                            },
                                            {
                                                title: 'who',
                                                icon: faUser
                                            },
                                            {
                                                title: 'action',
                                                icon: faGears
                                            },
                                            {
                                                title: 'info',
                                                icon: faCode
                                            },
                                        ]

                                    }>

                                    {
                                        trxList.length !== 0 ? trxList.map((element, i) => <BlockTrx data={element} key={element.trx.id} />) : <tr><td id={styles.empty}><FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />No transactions present.</td></tr>
                                    }

                                </Table>

                            </div>

                        </div>

                    </div>

                </Layout>
            }

        </Fragment>
    )
}