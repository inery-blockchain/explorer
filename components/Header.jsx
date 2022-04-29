/* eslint-disable @next/next/no-img-element */
import { useRef, useEffect, useContext, useState } from 'react'
import { useRouter } from "next/router"
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBars,
    faEarthAmericas,
    faMoon,
    faPowerOff
} from '@fortawesome/free-solid-svg-icons'
import {
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'
import Search from './Search'
import { MenuContext } from '../context/MenuContextProvider'
import { EndpointContext } from '../context/EndpointContextProvider'
import styles from '../styles/components/header.module.scss'

export default function Header() {

    const router = useRouter(),
        activePage = router.pathname,
        toggleRef = useRef(null),
        langRef = useRef(null),
        apiRef = useRef(null),
        menuRef = useRef(null),
        [locale, setLocale] = useState(false),
        [menuState, setMenuState] = useContext(MenuContext),
        [apiState, setApiState] = useContext(EndpointContext);

    useEffect(() => {

        const button = toggleRef.current,
            storedTheme = localStorage.getItem('explorerTheme') || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

        if (storedTheme) document.documentElement.setAttribute('data-theme', storedTheme);

        function toggleTheme() {

            const currentTheme = document.documentElement.getAttribute("data-theme");
            let targetTheme = "light";

            if (currentTheme === "light") {
                targetTheme = "dark";
            }

            document.documentElement.setAttribute('data-theme', targetTheme)
            localStorage.setItem('explorerTheme', targetTheme);
        }

        button.addEventListener('click', toggleTheme);

        return () => button.removeEventListener('click', toggleTheme);

    }, []);

    return (

        <header id={styles.header}>

            <div id={styles.background}>

                <div id={styles.archProp} className={styles.prop}></div>

                <div id={styles.bgProp} className={styles.prop}></div>

            </div>

            <div id={styles.foreground} className={`container`}>

                <div className={`row g-0`}>

                    <div className={`col-6 col-xxl-4`}>

                        <div id={styles.logo}>

                            <h1>
                                <Link href='/'>
                                    <a>
                                        <img src='/img/logo.png' alt='inery-explorer' />
                                    </a>
                                </Link>
                            </h1>

                        </div>

                    </div>

                    <div className={`col-6 col-xxl-8`}>

                        <Search isMobile={false} />

                        <div id={styles.menu}>

                            <Button disabled={true} id={styles.apiButton} className={styles.button} innerRef={apiRef} onClick={() => setApiState({ isMainNet: !apiState.isMainNet })} data-api={apiState.isMainNet}>

                                <FontAwesomeIcon icon={faPowerOff} id={styles.status} className={styles.menuIcon} />{apiState.isMainNet ? 'mainnet' : 'testnet'}

                            </Button>

                            <Button id={styles.themeButton} className={styles.button} innerRef={toggleRef}>

                                <FontAwesomeIcon icon={faMoon} className={styles.menuIcon} />Mode

                            </Button>

                            <Dropdown ref={langRef} isOpen={locale} toggle={() => setLocale(!locale)}>

                                <DropdownToggle id={styles.langButton} className={styles.button}>

                                    <FontAwesomeIcon icon={faEarthAmericas} className={styles.menuIcon} />Language

                                </DropdownToggle>

                                <DropdownMenu container="body">

                                    <DropdownItem header>
                                        Locale
                                    </DropdownItem>

                                    <DropdownItem onClick={function noRefCheck() { }}>
                                        english
                                    </DropdownItem>

                                    <DropdownItem disabled onClick={function noRefCheck() { }}>
                                        deutsch
                                    </DropdownItem>

                                    <DropdownItem disabled onClick={function noRefCheck() { }}>
                                        عربى
                                    </DropdownItem>

                                </DropdownMenu>

                            </Dropdown>

                            <Button id={styles.menuButton} innerRef={menuRef} className={styles.button} onClick={() => setMenuState(!menuState)}>

                                <FontAwesomeIcon icon={faBars} className={styles.menuIcon} />

                            </Button>

                        </div>

                    </div>

                </div>

            </div>

        </header>
    )
}