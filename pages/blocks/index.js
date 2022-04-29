import { Fragment, useState, useEffect, useContext } from 'react'
import { useRouter } from "next/router"
import Head from 'next/head'
import {
    faDiceD6,
    faCircleQuestion,
    faCircleNodes,
    faArrowRightArrowLeft,
    faHashtag
} from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import Block from '../../components/Block'
import Stats from '../../components/Stats'
import Navbar from '../../components/Navbar'
import { EndpointContext } from '../../context/EndpointContextProvider'


export default function Blocks() {

    const router = useRouter(),
        [isLoading, setLoading] = useState(true),
        [headBlockNum, setHeadBlockNum] = useState(0),
        [blockList, setBlockList] = useState([]),
        [networkError, setNetworkError] = useState(false),
        [apiState, setApiState] = useContext(EndpointContext);

    useEffect(() => {

        let controller = new AbortController();

        async function fetchData() {

            try {

                if (headBlockNum === 0) {

                    const response = await fetch(`${apiState.isMainNet ? apiState.mainnet : apiState.testnet}/v1/chain/get_info`, {
                        signal: controller?.signal
                    });
                    const data = await response.json();
                    setHeadBlockNum(data.head_block_num);
                    setLoading(false);
                    controller = null;

                } else {

                    const response = await fetch(`${apiState.isMainNet ? apiState.mainnet : apiState.testnet}/v1/chain/get_block`, {
                        method: 'POST',
                        body: JSON.stringify({
                            "block_num_or_id": headBlockNum
                        }),
                        signal: controller?.signal
                    })
                    const data = await response.json();
                    setBlockList(elements => [data, ...elements]);
                    setHeadBlockNum(headBlockNum + 1);
                    setLoading(false);
                    controller = null;
                }

            } catch (error) {

                console.warn(error);

                setLoading(false);

                /**setNetworkError(true);*/;
            }
        }

        fetchData();

        return () => controller?.abort();

    }, [apiState.isMainNet, apiState.mainnet, apiState.testnet, headBlockNum]);

    useEffect(() => {

        while (blockList?.length > 50) {

            blockList.pop();
        }

    }, [blockList]);

    return (

        <Fragment>

            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Blocks | Explorer</title>
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
                                    trim={50}
                                    header={

                                        [
                                            {
                                                title: 'block',
                                                icon: faDiceD6
                                            },
                                            {
                                                title: 'status',
                                                icon: faCircleQuestion
                                            },
                                            {
                                                title: 'node',
                                                icon: faCircleNodes
                                            },
                                            {
                                                title: 'transactions',
                                                icon: faArrowRightArrowLeft
                                            },
                                            {
                                                title: 'id',
                                                icon: faHashtag
                                            }
                                        ]

                                    }>

                                    {
                                        blockList.map((block) =>

                                            <Block serial={block?.block_num} id={block?.id} status={block?.confirmed} trx={block?.transactions?.length} node={block?.producer} key={block?.id} />
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