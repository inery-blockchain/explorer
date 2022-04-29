import { Fragment, useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Stats from '../../components/Stats'
import Navbar from '../../components/Navbar'
import { EndpointContext } from '../../context/EndpointContextProvider'
import styles from '../../styles/accountinfo.module.css'

export default function AccountDetails() {

    const router = useRouter(),

        [apiState, setApiState] = useContext(EndpointContext),

        [networkError, setNetworkError] = useState(false),

        [maxMEM, setMaxMEM] = useState(null),
        [maxCPU, setMaxCPU] = useState(null),
        [maxNET, setMaxNET] = useState(null),

        [usedMEM, setUsedMEM] = useState(null),
        [usedCPU, setUsedCPU] = useState(null),
        [usedNET, setUsedNET] = useState(null),

        [mem, setMEM] = useState('calculating...'),
        [cpu, setCPU] = useState('calculating...'),
        [net, setNET] = useState('calculating...'),

        [balance, setBalance] = useState('0 INR');

    useEffect(() => {

        let controller = new AbortController();

        async function fetchAccountDetails() {

            try {

                if (router.isReady === true) {

                    const response = await fetch(`${apiState.isMainNet ? apiState.mainnet : apiState.testnet}/v1/chain/get_account`, {
                        method: 'POST',
                        body: JSON.stringify({
                            "account_name": router.query.name
                        }),
                        signal: controller.signal
                    }),
                        data = await response.json();

                    if (response.status === 200) {

                        setMaxMEM(Number(data.mem_quota === -1 ? Infinity : data.mem_quota));
                        setMaxCPU(Number(data.cpu_limit.max === -1 ? Infinity : data.cpu_limit.max));
                        setMaxNET(Number(data.net_limit.max === -1 ? Infinity : data.net_limit.max));

                        setUsedMEM(data.mem_usage === -1 ? Infinity : data.mem_usage);
                        setUsedCPU(data.cpu_limit.used === -1 ? Infinity : data.cpu_limit.used);
                        setUsedNET(data.net_limit.used === -1 ? Infinity : data.net_limit.used);

                        setMEM(usedMEM === null || maxMEM === null ? 'calculating...' : (usedMEM / maxMEM) * 100);
                        setCPU(usedCPU === null || maxCPU === null ? 'calculating...' : (usedCPU / maxCPU) * 100);
                        setNET(usedNET === null || maxNET === null ? 'calculating...' : (usedNET / maxNET) * 100);

                        setBalance(data.core_liquid_balance ? data.core_liquid_balance : `0 INR`);
                    }

                    controller = null;
                }

            } catch (error) {

                console.warn(error);

                /**setNetworkError(true);*/
            }
        }

        fetchAccountDetails();

        return () => controller?.abort();

    }, [apiState.isMainNet, apiState.mainnet, apiState.testnet, maxCPU, maxMEM, maxNET, router.isReady, router.query.name, usedCPU, usedMEM, usedNET]);

    return (

        <Fragment>

            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Account Details | Explorer</title>
            </Head>

            {
                networkError === true ? <div id='error'>Whoops, something went wrong - please check your internet connection. <button onClick={router.reload}>reload</button></div> : <Layout>

                    <div className={`container`}>

                        <div className={`row g-0`}>

                            <div className={`col-12`}>

                                <Stats />

                            </div>

                            <h2 id={styles.title} className={`col-12`}>account information</h2>

                            <div className={`col-12`}>

                                <Navbar />

                            </div>

                            <div className={`col-12 col-lg-6 col-xxl-8`}>

                                <section id={styles.hardware} className={styles.section}>
                                    <div>
                                        <span id={styles.block}>
                                            {router?.query?.name}
                                        </span>
                                        <hr />
                                    </div>
                                    <div className={`row g-0`}>
                                        <div className={`col-4 ${styles.resource}`}>
                                            <span>inr</span>
                                        </div>
                                        <div className={`d-flex flex-column col-8`}>
                                            <label htmlFor={styles.mem}>
                                                <span>
                                                    {mem === Infinity || mem === 0 || isNaN(mem) === true && mem != 'calculating...' ? 'inactive' : mem === 'calculating...' ? mem : `${mem?.toFixed(10)} %`}
                                                </span>
                                                {
                                                    mem === Infinity || mem === 0 || isNaN(mem) === true || mem === 'calculating...' ? null : <meter id={styles.mem} min={0} max={maxMEM} value={usedMEM}></meter>
                                                }
                                            </label>
                                        </div>
                                    </div>
                                    <div className={`row g-0`}>
                                        <div className={`col-4 ${styles.resource}`}>
                                            <span>cpu</span>
                                        </div>
                                        <div className={`d-flex flex-column col-8`}>
                                            <label htmlFor={styles.cpu}>
                                                <span>
                                                    {cpu === Infinity || cpu === 0 || isNaN(cpu) === true && cpu != 'calculating...' ? 'inactive' : cpu === 'calculating...' ? cpu : `${cpu?.toFixed(10)} %`}
                                                </span>
                                                {
                                                    cpu === Infinity || cpu === 0 || isNaN(cpu) === true || cpu === 'calculating...' ? null : <meter id={styles.cpu} min={0} max={maxCPU} value={usedCPU}></meter>
                                                }
                                            </label>
                                        </div>
                                    </div>
                                    <div className={`row g-0`}>
                                        <div className={`col-4 ${styles.resource}`}>
                                            <span>net</span>
                                        </div>
                                        <div className={`d-flex flex-column col-8`}>
                                            <label htmlFor={styles.net}>
                                                <span>
                                                    {net === Infinity || net === 0 || isNaN(net) === true && net != 'calculating...' ? 'inactive' : net === 'calculating...' ? net : `${net?.toFixed(10)} %`}
                                                </span>
                                                {
                                                    net === Infinity || net === 0 || isNaN(net) === true || net === 'calculating...' ? null : <meter id={styles.net} min={0} max={maxNET} value={usedNET}></meter>
                                                }
                                            </label>
                                        </div>
                                    </div>
                                </section>

                            </div>

                            <div className={`col-12 col-lg-6 col-xxl-4 ${styles.shift} gx-lg-5 gy-4 gy-lg-0`}>

                                <section id={styles.balance} className={styles.section}>
                                    <div>
                                        <span>Total INR Balance</span>
                                        <span>{balance}</span>
                                    </div>
                                    <div>
                                        <span>Total USDT Rewards</span>
                                        <span>{`${balance?.split(' ')[0] * 0.16} USDT`}</span>
                                    </div>
                                </section>

                            </div>

                        </div>

                    </div>

                </Layout>
            }

        </Fragment>
    )
}