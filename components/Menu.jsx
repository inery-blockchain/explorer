/* eslint-disable @next/next/no-img-element */
import { useRef, useEffect, useContext, useState } from 'react'
import { useRouter } from "next/router"
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEarthAmericas,
    faInfoCircle,
    faMoon,
    faPowerOff,
    faXmark
} from '@fortawesome/free-solid-svg-icons';
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
import styles from '../styles/components/menu.module.scss'

export default function Menu() {

    const router = useRouter(),
        activePage = router.pathname,
        toggleRef = useRef(null),
        asideRef = useRef(null),
        langRef = useRef(null),
        apiRef = useRef(null),
        closeRef = useRef(null),
        [locale, setLocale] = useState(false),
        [menuState, setMenuState] = useContext(MenuContext),
        [apiState, setApiState] = useContext(EndpointContext);

    useEffect(() => {

        const menu = asideRef.current,
            mql = window.matchMedia('(min-width: 1400px)');

        function toggleMenu(e) {

            if (e.target.matches) {

                if (menuState === true) {

                    setMenuState(false);

                } else {

                    menu.style.display = 'none';
                }

            } else {

                menu.style.display = 'flex';
            }
        }

        mql.addEventListener('change', toggleMenu);

        return () => mql.removeEventListener('change', toggleMenu);

    }, [menuState, setMenuState]);

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

        <aside ref={asideRef} data-active={menuState} id={styles.menu}>

            <div className='container-fluid'>

                <div className='row g-0 gy-5 align-items-center justify-content-center'>

                    <div className='col-12'>

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

                    <div className='col-12'>

                        <Search isMobile={true} />

                    </div>

                    <div className='col-12'>

                        <a href='https://docs.inery.io/' target='_blank' rel='noreferrer' id={styles.docLink} className='btn'>
                            <FontAwesomeIcon icon={faInfoCircle} />docs
                        </a>

                    </div>

                    <div className='col-auto gx-3'>

                        <Button disabled={true} id={styles.apiButton} className={styles.button} innerRef={apiRef} onClick={() => setApiState({isMainNet: !apiState.isMainNet})} data-api={apiState.isMainNet}>

                            <FontAwesomeIcon icon={faPowerOff} id={styles.status} className={styles.menuIcon} />

                            {apiState.isMainNet ? 'mainnet' : 'testnet'}

                        </Button>

                    </div>

                    <div className='col-auto gx-3'>

                        <Button id={styles.themeButton} className={styles.button} innerRef={toggleRef}>

                            <FontAwesomeIcon icon={faMoon} className={styles.menuIcon} />Mode

                        </Button>

                    </div>

                    <div className='col-auto gx-3'>

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

                    </div>

                    <div className='col-12'>

                        <Button id={styles.close} innerRef={closeRef} className={styles.button} onClick={() => setMenuState(!menuState)}>

                            <FontAwesomeIcon icon={faXmark} className={styles.menuIcon} />

                        </Button>

                    </div>

                </div>

            </div>

        </aside>
    )
}