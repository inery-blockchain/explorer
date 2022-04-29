import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from "next/router"
import {
    faCircleNodes,
    faCoins,
    faDiceD6,
    faDollarSign,
    faGaugeHigh,
    faUser
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { EndpointContext } from '../context/EndpointContextProvider'
import styles from '../styles/components/stats.module.scss'

export default function Stats() {

    const [inr, setINR] = useState('--'),
        [cap, setCap] = useState('0.20 | 2.1B'),
        [producer, setProducer] = useState('--'),
        [accounts, setAccounts] = useState('--'),
        [headBlock, setHeadBlock] = useState('--'),
        [tps, setTPS] = useState(0),
        [balance, setBalance] = useState(0),
        [supply, setSupply] = useState(0),
        [percentage, setPercentage] = useState(0),
        [apiState, setApiState] = useContext(EndpointContext),

        router = useRouter();

    useEffect(() => {

        let controller = new AbortController();

        async function fetchBalance() {

            try {

                const response = await fetch(`${apiState.isMainNet ? apiState.mainnet : apiState.testnet}/v1/chain/get_currency_balance`, {
                    method: 'POST',
                    body: JSON.stringify({
                        "code": "inery.token",
                        "account": "inery",
                        "symbol": "INR"
                    }),
                    signal: controller?.signal
                }),
                    data = await response.json();

                setBalance(Number(data.toString().split(' ')[0]));

                controller = null;

            } catch (error) {

                console.warn(error);
            }
        }

        fetchBalance();

        return () => controller?.abort();

    }, [apiState.isMainNet, apiState.mainnet, apiState.testnet]);

    useEffect(() => {

        let controller = new AbortController();

        async function fetchSupply() {

            try {

                const response = await fetch(`${apiState.isMainNet ? apiState.mainnet : apiState.testnet}/v1/chain/get_currency_stats`, {
                    method: 'POST',
                    body: JSON.stringify({
                        "code": "inery.token",
                        "account": "inery",
                        "symbol": "INR"
                    }),
                    signal: controller?.signal
                }),
                    data = await response.json();

                setSupply(Number(data.INR.supply.split(' ')[0]));

                controller = null;

            } catch (error) {

                console.warn(error);
            }
        }

        fetchSupply();

        return () => controller?.abort();

    }, [apiState.isMainNet, apiState.mainnet, apiState.testnet]);

    useEffect(() => {

        setPercentage((((supply - balance) / 2100000000) * 100));

    }, [balance, percentage, supply]);

    useEffect(() => {

        let controller = new AbortController();

        async function fetchHeadBlock() {

            try {

                const response_a = await fetch(`${apiState.isMainNet ? apiState.mainnet : apiState.testnet}/v1/chain/get_info`, {
                    signal: controller?.signal
                }),
                    data_a = await response_a.json();

                setProducer(data_a.head_block_producer);
                setHeadBlock(data_a.head_block_num);

                controller = null;

            } catch (error) {

                console.warn(error);
            }
        }

        fetchHeadBlock();

        const intervalID = setInterval(() => {

            fetchHeadBlock();

        }, [5000]);

        return () => {

            controller?.abort();
            clearInterval(intervalID);
        }

    }, [apiState.isMainNet, apiState.mainnet, apiState.testnet]);

    useEffect(() => {

        let controller = new AbortController();

        async function fetchBlock() {

            try {

                const response_b = await fetch(`${apiState.isMainNet ? apiState.mainnet : apiState.testnet}/v1/chain/get_block`, {
                    method: 'POST',
                    body: JSON.stringify({
                        "block_num_or_id": headBlock
                    }),
                    signal: controller?.signal
                }),
                    data_b = await response_b.json();

                setTPS(data_b.transactions.length);

                controller = null;

            } catch (error) {

                console.warn(error);
            }
        }

        if (typeof headBlock === 'number' && headBlock > 0) {

            fetchBlock();
        }

        return () => {

            controller?.abort();
        }

    }, [apiState.isMainNet, apiState.mainnet, apiState.testnet, headBlock]);

    useEffect(() => {

        let controller = new AbortController();

        async function fetchAccount() {

            try {

                const response = await fetch(`${apiState.isMainNet ? apiState.mainnet : apiState.testnet}/v1/chain/get_account`, {
                    method: 'POST',
                    body: JSON.stringify({
                        "account_name": "createacc"
                    }),
                    signal: controller.signal
                }),
                    data = await response.json();
                setAccounts((100000 - data.core_liquid_balance.split(' ')[0]) / 7);
                controller = null;

            } catch (error) {

                console.warn(error);
            }
        }

        fetchAccount();

    }, [apiState.isMainNet, apiState.mainnet, apiState.testnet]);

    return (

        <section id={styles.stats} className={`row g-0`}>

            <div className={`col-12 col-xl-4`}>

                <div id={styles.stat0} className={styles.statBox}>
                    <div>
                        <span>INR Price</span>
                        <span>
                            <FontAwesomeIcon icon={faCoins} className={styles.icon} />0.20
                        </span>
                    </div>
                    <div>
                        <span>Price | Marketcap</span>
                        <span>
                            <FontAwesomeIcon icon={faDollarSign} className={styles.icon} />{cap}
                        </span>
                    </div>
                    <div>
                        <span>Master Node</span>
                        <span>
                            <FontAwesomeIcon icon={faCircleNodes} className={styles.icon} />{producer}
                        </span>
                    </div>
                    <div>
                        <span>Accounts</span>
                        <span>
                            <FontAwesomeIcon icon={faUser} className={styles.icon} />{accounts}
                        </span>
                    </div>
                    <div>
                        <span>Head Block</span>
                        <span>
                            <FontAwesomeIcon icon={faDiceD6} className={styles.icon} />{headBlock}
                        </span>
                    </div>
                    <div>
                        <span>Current / Max TPS</span>
                        <span>
                            <FontAwesomeIcon icon={faGaugeHigh} className={styles.icon} />{tps} / 7870
                        </span>
                    </div>
                </div>

            </div>

            <div className={`col-12 col-xl-4`}>

                <div id={styles.stat1} className={styles.statBox}>
                    <div>
                        <div>
                            <span>Total</span>
                            <hr />
                            <span><strong>{'2.1B'}</strong></span>
                        </div>
                        <div>
                            <span>Aloted</span>
                            <hr />
                            <span><strong>{`${supply - balance} INR`}</strong> / 2.1B</span>
                        </div>
                    </div>
                    <div>
                        <meter value={50000000} min={0} max={2100000000} />
                        <span>{`${percentage > 0 ? percentage.toFixed(4) : 0}%`}</span>
                    </div>

                </div>

            </div>

            <div className={`col-12 col-xl-4`}>

                <div id={styles.stat2} className={styles.statBox}>
                    <div>
                        <span>INR Price By Phase</span>
                    </div>
                    <div >
                        <div id={styles.chartWrapper}>
                            <Chart

                                id={styles.chart}
                                type='line'
                                datasetIdKey='id'
                                data={
                                    {
                                        labels: ['Pre-Seed', 'Seed', 'Private A', 'Strategic / KOL', 'Pre-Sale', 'Public / IDO'],
                                        datasets: [
                                            {
                                                id: 1,
                                                label: 'INR Value',
                                                data: [0.03, 0.05, 0.08, 0.12, 0.16, 0.20],
                                                backgroundColor: '#57ffff',
                                                pointBackgroundColor: '#57ffff',
                                                borderColor: '#57ffff',
                                                borderWidth: '1',
                                                hoverBorderWidth: '2',
                                                pointBackgroundColor: '#0ac1ed',
                                                pointBorderColor: '#0ac1ed',
                                                fill: {
                                                    target: 'origin',
                                                    above: '#0ac1ed20'
                                                }
                                            },
                                        ]
                                    }
                                }
                                options={{
                                    maintainAspectRatio: false,
                                    responsive: true,
                                    hover: {
                                        mode: 'nearest',
                                        intersect: true
                                    },
                                    line: {
                                        datasets: {
                                            tension: 1
                                        }
                                    },
                                    scales: {
                                        y: {
                                            grid: {
                                                color: [
                                                    '#0161ea40'
                                                ]
                                            },
                                            ticks: {
                                                display: false,
                                            }
                                        },
                                        x: {
                                            grid: {
                                                color: [
                                                    '#0161ea40'
                                                ]
                                            }
                                        }
                                    }
                                }}
                                fallbackContent={<p>Graph display unsuported by client.</p>}
                            />
                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}