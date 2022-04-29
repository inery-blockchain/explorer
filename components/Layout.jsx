import { Fragment } from 'react'
import Header from './Header'
import Footer from './Footer'
import Menu from './Menu'
import styles from '../styles/components/layout.module.scss'

export default function Layout({...props}) {

    return (

        <Fragment>

            <Header />

            <main id={styles.layout}>

                {props.children}

            </main>

            <Footer />

            <Menu />

        </Fragment>
    )
}