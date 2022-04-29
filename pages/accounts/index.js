import { useEffect, useState, Fragment, useContext } from "react"
import { useRouter } from "next/router"
import Head from 'next/head'
import {
    faCalendar,
    faClock,
    faCrown,
    faDiceD6,
    faHashtag,
    faUser
} from "@fortawesome/free-solid-svg-icons"
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import Account from '../../components/Account'
import Stats from '../../components/Stats'
import Navbar from "../../components/Navbar"
import { EndpointContext } from '../../context/EndpointContextProvider'

export default function Accounts() {

    const router = useRouter(),
        [isLoading, setLoading] = useState(true),
        [producerList, setProducerList] = useState([]),
        [networkError, setNetworkError] = useState(false),
        [apiState, setApiState] = useContext(EndpointContext);

    useEffect(() => {

        let controller = new AbortController();

        async function fetchProducers() {

            try {

                const response = await fetch(`${apiState.isMainNet ? apiState.mainnet : apiState.testnet}/v1/chain/get_producers`, {
                    method: 'POST',
                    body: JSON.stringify({
                        /* "limit": "100", <--- Producer list length */
                        "lower_bound": "0",
                        "json": true
                    }),
                    signal: controller.signal
                }),
                    data = await response.json();
                setProducerList(data.rows);
                setLoading(false);
                controller = null;

            } catch (error) {

                console.warn(error);

                setLoading(false);

                /**setNetworkError(true);*/
            }
        }

        fetchProducers();

        return () => controller?.abort();

    }, [apiState.isMainNet, apiState.mainnet, apiState.testnet]);


    return (

        <Fragment>

            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Accounts | Explorer</title>
            </Head>

            {
                networkError === true ? <div id='error'>Whoops, something went wrong - please check your internet connection. <button onClick={router.reload}>reload</button></div> : <Layout>

                    <div className={`container`}>

                        <div className={`row gy-5 gx-0`}>

                            <div className={`col-12`}>

                                <Stats />

                            </div>

                            <div className={`col-12`}>

                                <Navbar />

                            </div>

                            <div className={`col-12  gy-0`}>

                                <Table
                                    isLoading={isLoading}
                                    trim={0}
                                    header={

                                        [
                                            {
                                                title: 'number',
                                                icon: faHashtag
                                            },
                                            {
                                                title: 'account',
                                                icon: faUser
                                            },
                                            {
                                                title: 'block',
                                                icon: faDiceD6
                                            },
                                            {
                                                title: 'produced at',
                                                icon: faClock
                                            },
                                            {
                                                title: 'created on',
                                                icon: faCalendar
                                            }
                                        ]

                                    }>

                                    {
                                        producerList.map((producer, i) =>

                                            <Account num={i + 1} prod={producer.owner} key={i} />
                                        )
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