import React from "react";
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from '../styles/components/trx.module.scss'

export default function Transaction({ num, block }) {

    return (

        block.transactions ? block.transactions.map((element) =>
            < tr className={styles.trx} key={block.id + element.trx.id} >
                <td>
                    <span className={styles.inlineHeader}>#</span>
                    <span>
                        <Link href={{
                            pathname: '/blocks/block_info',
                            query: {
                                num: num
                            }
                        }}>
                            <a>
                                {num}
                            </a>
                        </Link>
                    </span>
                </td>
                <td>
                    <span className={styles.inlineHeader}>
                        who
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faUser} className={styles.icon} />
                        <Link href={{
                            pathname: '/accounts/account_info',
                            query: {
                                name: element.trx.transaction.actions[0].account
                            }
                        }}>
                            <a>
                                {element.trx.transaction.actions[0].account}
                            </a>
                        </Link>
                    </span>
                </td>
                <td>
                    <span className={styles.inlineHeader}>action</span>
                    <span>
                        {element.trx.transaction.actions[0].name}
                    </span>
                </td>
                <td>
                    <span className={styles.inlineHeader}>data</span>
                    <span>
                        <pre>
                            <code>
                                {JSON.stringify(element.trx.transaction.actions[0].data, null, 4)}
                            </code>
                        </pre>
                    </span>
                </td>
            </tr >

        ) : null
    )
}