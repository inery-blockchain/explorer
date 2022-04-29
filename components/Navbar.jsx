import React, { useEffect, useRef } from "react"
import Link from "next/link"
import styles from '../styles/components/navbar.module.scss'
import { useRouter } from "next/router";

export default function Navbar() {

    const navLinkBlocks = useRef(null),
        navLinkAccounts = useRef(null),
        navLinkTransactions = useRef(null);
        const activePage = useRouter();

        useEffect(() => {

        const navLinks = [navLinkBlocks.current, navLinkAccounts.current, navLinkTransactions.current];

        if (activePage.isReady === true) {

            if (activePage.pathname.includes(`/blocks`)) {
                navLinks[0].classList.add(styles.current);
            } else if (activePage.pathname.includes(`/accounts`)) {
                navLinks[1].classList.add(styles.current);
            } else if (activePage.pathname.includes(`/transactions`)) {
                navLinks[2].classList.add(styles.current);
            }
        }

    }, [activePage.isReady, activePage.pathname]);

    return (

        <nav id={styles.navbar}>
            <ul>
                <li ref={navLinkBlocks}>
                    <Link href={activePage.pathname.includes('testnet') ? "/testnet/blocks" : "/blocks"}>
                        <a>
                            blocks
                        </a>
                    </Link>
                </li>
                <li ref={navLinkAccounts}>
                    <Link href={activePage.pathname.includes('testnet') ? "/testnet/accounts" : "/accounts"}>
                        <a>
                            Master Nodes
                        </a>
                    </Link>
                </li>
                <li ref={navLinkTransactions}>
                    <Link href={activePage.pathname.includes('testnet') ? "/testnet/transactions" : "/transactions"}>
                        <a>
                            transactions
                        </a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}