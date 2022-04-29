/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    faGithub,
} from '@fortawesome/free-brands-svg-icons';
import {
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/inbound.module.css'

export default function Inbound() {

    const circleRef0 = useRef(null),
        circleRef1 = useRef(null),
        circleRef2 = useRef(null),
        circleRef3 = useRef(null),
        valueRef0 = useRef(null),
        valueRef1 = useRef(null),
        valueRef2 = useRef(null),
        valueRef3 = useRef(null);

    useEffect(() => {

        /* ##### Coming Soon Page Countdown Timer ##### */

        /* Define Time Units */

        const s = 1000,
            m = s * 60,
            h = m * 60,
            d = h * 24,
            t = new Date("Jul 1, 2022 00:00:00").getTime(), // Target date in milliseconds
            t_test = new Date().getTime() + 10000; // Sets the time window to 10 seconds from current time

        /* Set Timer */

        const timer = setInterval(() => { // Facilitates timer update

            /* Time Calculation */

            const c = new Date().getTime(), // Current epoch time
                r = t - c, // Distance to target date in milliseconds
                /* r = t_test - c; */ // A 10-second countdown for testing purposes

                /* Define ETA */

                days = Math.floor(r / (d)),
                hours = Math.floor((r % (d)) / (h)),
                minutes = Math.floor((r % (h)) / (m)),
                seconds = Math.floor((r % (m)) / s);

            if (valueRef0?.current, valueRef1?.current, valueRef2?.current, valueRef3?.current) {

                /* Print Time Values to UI */

                valueRef0.current.innerHTML = days < 10 ? '0' + days : days;
                valueRef1.current.innerHTML = hours < 10 ? '0' + hours : hours;
                valueRef2.current.innerHTML = minutes < 10 ? '0' + minutes : minutes;
                valueRef3.current.innerHTML = seconds < 10 ? '0' + seconds : seconds;

                /* Countdown Timer UI Algorithm */

                circleRef0.current.style.strokeDashoffset = 270.18 + ((270.18 / 100) * ((days / 72) * 100)); // (days / n ) where n == Initial distance to target date expressed in days as measured on release
                circleRef1.current.style.strokeDashoffset = 270.18 + ((270.18 / 100) * ((hours / 24) * 100));
                circleRef2.current.style.strokeDashoffset = 270.18 + ((270.18 / 100) * ((minutes / 60) * 100));
                circleRef3.current.style.strokeDashoffset = 270.18 + ((270.18 / 100) * ((seconds / 60) * 100));
            }

            /**
             * Algorithm Reference
             *
             * circumference + ((circumference / 100) * ((current time / timeframe) * 100)) =>
             * => circumference + ((circumference / 100) * (fraction of timeframe * 100)) =>
             * => circumference + (1% of circumference * % of timeframe) =>
             * => circumference + % of circumference =>
             * => (100+n)% circumference where n = % of circumference =>
             * => n% circumference fill
            **/

            if (r <= 1000) { // Stops timer at 0
                clearInterval(timer);
            }

        }, 0);

        return () => {

            clearInterval(timer);
        }

    }, []);

    return (

        <React.Fragment>

            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Launching Soon | Explorer</title>
            </Head>

            <img src='/img/blockchain.png' alt='' id={styles.bgProp} className={`d-none d-xxl-block`} />

            <header id={styles.header} className={`container`}>
                <div className={`row`}>
                    <div className={`col-12`}>
                        <h1>
                            <Link href='/'>
                                <a>
                                    <img src='/img/logo.png' alt='inery-logo-image' /> <span>mainnet explorer</span>
                                </a>
                            </Link>
                        </h1>
                    </div>
                </div>
            </header>

            <main id={styles.main} className={`container`}>
                <div className={`row`}>
                    <div className={`col-12 col-xxl-8`}>
                        <div className={`row`}>

                            {/* <div className={`col-12 col-xl-6 col-xxl-12`}>
                                <div id={styles.clock} className={`row`}>
                                    <div className={`col-3 col-xl-6 col-xxl-3`}>

                                        <div className={styles.card}>
                                            <div id={styles.d} className={styles.counter}>
                                                <svg viewBox='0 0 100 100'>
                                                    <circle ref={circleRef0} cx='50' cy='50' r='43' />
                                                </svg>
                                                <span ref={valueRef0} className={styles.time}></span>
                                            </div>
                                            <span>days</span>
                                        </div>

                                    </div>
                                    <div className={`col-3 col-xl-6 col-xxl-3`}>

                                        <div className={styles.card}>
                                            <div id={styles.d} className={styles.counter}>
                                                <svg viewBox='0 0 100 100'>
                                                    <circle ref={circleRef1} cx='50' cy='50' r='43' />
                                                </svg>
                                                <span ref={valueRef1} className={styles.time}></span>
                                            </div>
                                            <span>hours</span>
                                        </div>

                                    </div>
                                    <div className={`col-3 col-xl-6 col-xxl-3`}>

                                        <div className={styles.card}>
                                            <div id={styles.d} className={styles.counter}>
                                                <svg viewBox='0 0 100 100'>
                                                    <circle ref={circleRef2} cx='50' cy='50' r='43' />
                                                </svg>
                                                <span ref={valueRef2} className={styles.time}></span>
                                            </div>
                                            <span>minutes</span>
                                        </div>

                                    </div>
                                    <div className={`col-3 col-xl-6 col-xxl-3`}>

                                        <div className={styles.card}>
                                            <div id={styles.d} className={styles.counter}>
                                                <svg viewBox='0 0 100 100'>
                                                    <circle ref={circleRef3} cx='50' cy='50' r='43' />
                                                </svg>
                                                <span ref={valueRef3} className={styles.time}></span>
                                            </div>
                                            <span>seconds</span>
                                        </div>

                                    </div>
                                </div>
                            </div> */}

                            <div className={`col-12`}>
                                <h1 id={styles.title}>we are<br /> launching soon</h1>
                                <p id={styles.description}>
                                    Next generation INERY Blockchain explorer built in Next.js with cutting-edge precision and performance. Stay tuned for further information regarding this project.<br />
                                    <Link href='/blocks'><a>Explore the testnet <FontAwesomeIcon icon={faChevronRight} /></a></Link>
                                </p>
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

                        </div>
                    </div>
                </div>
            </main>

        </React.Fragment>
    )
}