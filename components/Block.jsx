import React from 'react'
import Link from 'next/link'
import styles from '../styles/components/block.module.scss'

export default function Block({ serial, id, status, trx, node }) {

    return (

        <tr className={styles.block}>
            <td className={styles.serial}>
                <span>Block</span>
                <span>
                    <Link href={{
                        pathname: '/blocks/block_info',
                        query: {
                            num: serial
                        }
                    }}>
                        <a>{serial}</a>
                    </Link>
                </span>
            </td>
            <td>
                <span>Status</span>
                <span data-status={status > 0 ? 'confirmed' : 'denied'}>{status > 0 ? 'confirmed' : 'denied'}</span>
            </td>
            <td className={styles.node}>
                <span>Node</span>
                <span>
                    <Link href={{
                        pathname: '/accounts/account_info',
                        query: {
                            name: node
                        }
                    }}>
                        <a>{node}</a>
                    </Link>
                </span>
            </td>
            <td className={styles.transactions}>
                <span>Transactions</span>
                <span>{trx}</span>
            </td>
            <td>
                <span>ID</span>
                <span>{id}</span>
            </td>
        </tr>
    )
}