import React from "react";
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from '../styles/components/blocktrx.module.scss'

export default function BlockTrx({ data }) {

    return (

            < tr className={styles.trx}>
                <td>
                    <span className={styles.inlineHeader}>
                        who
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faUser} className={styles.icon} />
                        <Link href={{
                            pathname: '/accounts/account_info',
                            query: {
                                name: data.trx.transaction.actions[0].account
                            }
                        }}>
                            <a>
                                {data.trx.transaction.actions[0].account}
                            </a>
                        </Link>
                    </span>
                </td>
                <td>
                    <span className={styles.inlineHeader}>action</span>
                    <span>
                        {data.trx.transaction.actions[0].name}
                    </span>
                </td>
                <td>
                    <span className={styles.inlineHeader}>hash</span>
                    <span>
                        {data.trx.id}
                    </span>
                </td>
                <td>
                    <span className={styles.inlineHeader}>data</span>
                    <span>
                        <pre>
                            <code>
                                {JSON.stringify(data.trx.transaction.actions[0].data, null, 4)}
                            </code>
                        </pre>
                    </span>
                </td>
            </tr>

    )
}