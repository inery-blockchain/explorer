import { useEffect, useRef, useState, useContext } from "react"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faFilter,
    faSearch
}
    from "@fortawesome/free-solid-svg-icons"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MenuContext } from '../context/MenuContextProvider'
import { EndpointContext } from "../context/EndpointContextProvider"
import styles from '../styles/components/search.module.scss'

export default function Search({ isMobile }) {

    const router = useRouter(),
        activePage = router.pathname,
        [popup, setPopup] = useState(null),
        [menuState, setMenuState] = useContext(MenuContext),
        [apiState, setApiState] = useContext(EndpointContext),
        [filter, setFilter] = useState(false),
        [filterState, setFilterState] = useState(''),
        searchRef = useRef(null),
        popupRef = useRef(null),
        filterRef = useRef(null);

    useEffect(() => {

        const storageQuery = JSON.parse(sessionStorage.getItem('explorerSearchFilter'));

        setFilterState(storageQuery === null ? 'blocks' : storageQuery);

    }, []);

    useEffect(() => {

        if (filterState !== '') {

            sessionStorage.setItem('explorerSearchFilter', JSON.stringify(filterState));
        }

    }, [filterState]);

    useEffect(() => {

        if (popup === 'Processing...') {
            searchRef.current.classList.add(styles.success);
            searchRef.current.classList.remove(styles.fail);
        } else if (popup !== 'processing...' && popup !== null && popup !== '') {
            searchRef.current.classList.add(styles.fail);
            searchRef.current.classList.remove(styles.success);
        } else {
            searchRef.current.classList.remove(styles.success);
            searchRef.current.classList.remove(styles.fail);
        }

    }, [popup]);

    return (

        <form data-mobile={isMobile} data-hidden={menuState} autoComplete="off" name="filter" id={styles.search}>

            <FontAwesomeIcon icon={faSearch} id={styles.searchIcon} className={styles.icon} />

            <input
                ref={searchRef}
                type={filterState === 'blocks' ? 'number' : 'text'}
                name="search"
                id="search"
                placeholder={popup === null ? `Search...` : popup}
                onFocus={(event) => {
                    event.target.value = '';
                    setPopup('');
                }}
                onBlur={() => {
                    setPopup(null);
                }}
                onChange={() => {
                    setPopup(null);
                }}
                onKeyPress={(event) => {

                    let controller = new AbortController();

                    if (event.key === 'Enter' && filterState === 'blocks') {

                        event.preventDefault();

                        async function fetchBlock() {

                            try {

                                searchRef.current.blur();
                                const block = searchRef.current.value;
                                searchRef.current.value = '';
                                setPopup('Processing...');

                                const response = await fetch(apiState.isMainNet ? `${apiState.mainnet}/v1/chain/get_block` : `${apiState.testnet}/v1/chain/get_block`, {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        "block_num_or_id": block
                                    }),
                                    signal: controller?.signal
                                });
                                if (response.status === 200) {

                                    searchRef.current.blur();
                                    searchRef.current.value = '';
                                    setPopup(null);

                                    if (apiState.isMainNet === false) {

                                        if (isMobile === true) {
                                            setMenuState(!menuState)
                                        }

                                        router.push(`/${filterState}/block_info?num=${block}`);

                                    }

                                } else if (response.status === 400 || response.status === 404) {

                                    searchRef.current.blur();
                                    searchRef.current.value = '';
                                    setPopup('Block does not exist.');

                                } else if (response.status === 500) {

                                    searchRef.current.blur();
                                    searchRef.current.value = '';
                                    setPopup('Invalid block ID.');
                                }
                                controller = null;

                            } catch (error) {

                                console.warn(error);

                                searchRef.current.blur();
                                searchRef.current.value = '';
                                setPopup('Connection error.');
                            }
                        }

                        fetchBlock();

                        return () => controller?.abort();

                    } else if (event.key === 'Enter' && filterState === 'accounts') {

                        event.preventDefault();

                        async function fetchAccount() {

                            try {

                                searchRef.current.blur();
                                const account = searchRef.current.value;
                                searchRef.current.value = '';
                                setPopup('Processing...');

                                const response = await fetch(apiState.isMainNet ? `${apiState.mainnet}/v1/chain/get_account` : `${apiState.testnet}/v1/chain/get_account`, {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        "account_name": account.toLowerCase()
                                    }),
                                    signal: controller.signal
                                });
                                console.warn(response)
                                if (response.status === 200) {

                                    setPopup(null);

                                    if (apiState.isMainNet === false) {

                                        if (isMobile === true) {
                                            setMenuState(!menuState)
                                        }

                                        router.push(`/${filterState}/account_info?name=${account}`);

                                    }

                                } else if (response.status === 500) {

                                    searchRef.current.blur();
                                    searchRef.current.value = '';
                                    setPopup('No such account found.');
                                }
                                controller = null;

                            } catch (error) {

                                console.warn(error);

                                searchRef.current.blur();
                                searchRef.current.value = '';
                                setPopup('Connection error.');
                            }
                        }

                        fetchAccount();

                        return () => controller?.abort();
                    }
                }}
            />

            <Dropdown id={styles.filter} ref={filterRef} isOpen={filter} toggle={() => setFilter(!filter)} size={'sm'}>
                <DropdownToggle className={styles.button}>
                    <FontAwesomeIcon icon={faFilter} className={styles.icon} />{filterState}
                </DropdownToggle>
                <DropdownMenu container="body">
                    <DropdownItem header>
                        Search Filter
                    </DropdownItem>
                    <DropdownItem onClick={() => setFilterState('blocks')}>
                        blocks
                    </DropdownItem>
                    <DropdownItem onClick={() => setFilterState('accounts')}>
                        accounts
                    </DropdownItem>
                    <DropdownItem disabled onClick={() => setFilterState('transactions')}>
                        transactions
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

        </form>
    )
}