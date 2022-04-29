/* eslint-disable @next/next/no-img-element */
import { forwardRef, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBitcoin,
    faTwitter,
    faLinkedinIn,
    faRedditAlien,
    faTelegramPlane,
    faDiscord,
    faYoutube,
    faInstagram,
    faMediumM,
    faGithub
} from '@fortawesome/free-brands-svg-icons'
import styles from '../styles/components/footer.module.scss'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {

    return (

        <footer id={styles.footer}>

            <div id={styles.archProp} className={styles.prop}></div>

            <div id={styles.bgProp} className={styles.prop}></div>

            <div id={styles.foreground} className='container'>

                <div className='row align-items-center justify-content-evenly'>

                    <div id={styles.logo} className={`col-12 col-lg-auto`}>
                        <Link href='/'>
                            <a>
                                <img src='/img/logo.png' alt='inery-logo-white' />
                            </a>
                        </Link>
                        <a href='https://docs.inery.io/' target='_blank' rel='noreferrer' id={styles.docLink}>
                            <FontAwesomeIcon icon={faInfoCircle} />docs
                        </a>
                    </div>

                    <div className={`col-12 col-lg-auto`}>

                        <span id={styles.social}>

                            <a target='_blank' rel='noreferrer' href='https://bitcointalk.org/index.php?topic=5363181'>
                                <FontAwesomeIcon icon={faBitcoin} className={styles.icon} />
                            </a>

                            <a target='_blank' rel='noreferrer' href='https://twitter.com/ineryblockchain'>
                                <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
                            </a>

                            <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/company/inery-blockchain'>
                                <FontAwesomeIcon icon={faLinkedinIn} className={styles.icon} />
                            </a>

                            <a target='_blank' rel='noreferrer' href='https://www.reddit.com/r/Inery/'>
                                <FontAwesomeIcon icon={faRedditAlien} className={styles.icon} />
                            </a>

                            <a target='_blank' rel='noreferrer' href='https://t.me/inery_blockchain'>
                                <FontAwesomeIcon icon={faTelegramPlane} className={styles.icon} />
                            </a>

                            <a target='_blank' rel='noreferrer' href='https://discord.gg/inery'>
                                <FontAwesomeIcon icon={faDiscord} className={styles.icon} />
                            </a>

                            <a target='_blank' rel='noreferrer' href='https://www.youtube.com/channel/UCLDa45z8agwE2F7m51KV2cg'>
                                <FontAwesomeIcon icon={faYoutube} className={styles.icon} />
                            </a>

                            <a target='_blank' rel='noreferrer' href='https://www.instagram.com/inery_blockchain/'>
                                <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
                            </a>

                            <a target='_blank' rel='noreferrer' href='https://medium.com/@Inery.Blockchain'>
                                <FontAwesomeIcon icon={faMediumM} className={styles.icon} />
                            </a>

                            <a target='_blank' rel='noreferrer' href='https://github.com/inery-blockchain'>
                                <FontAwesomeIcon icon={faGithub} className={styles.icon} />
                            </a>

                        </span>

                    </div>

                    <div className='d-flex col-12 col-lg-auto justify-content-center'>

                        <div id={styles.badgeBox}>

                            <div className={styles.badge}>
                                <a href={null}>
                                    <img src='/img/android.png' alt='get the explorer android app' />
                                </a>
                            </div>
                            <div className={styles.badge}>
                                <a href={null}>
                                    <img src='/svg/ios-black.svg' alt='get the explorer ios app' />
                                </a>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </footer>
    )
}