import React from "react";
import styles from '../styles/components/loader.module.css'

export default function Loader() {

    return (

        <div id={styles.loader}>
            <svg viewBox='0 0 100 100'>
                <circle cx='50' cy='50' r='43' />
                <circle cx='50' cy='50' r='43' />
            </svg>
        </div>
    )
}