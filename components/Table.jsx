import { useRef, useEffect } from 'react'
import Loader from './Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../styles/components/table.module.scss'

export default function Table({ isLoading, header, trim, ...props }, ref) {

    const style = {
        textTransform: 'uppercase'
    },
        tableRef = useRef(null);

    useEffect(() => {

        const tableBody = tableRef.current;

        if (trim > 0) {

            while (tableBody.children.length > trim) {

                tableRef.current.removeChild(tableRef.current.lastElementChild);
            }
        }

    }, [trim]);

    return (

        <div id={styles.wrapper}>

            <div id={styles.content}>

                {
                    isLoading === true ? <Loader /> : null
                }

                <table id={styles.data}>

                    <thead>

                        <tr>

                            {
                                header.map((column, i) =>

                                    <th key={i}>
                                        <span style={column.title === 'id' ? style : null}>
                                            <FontAwesomeIcon icon={column.icon} className={styles.icon} />{column.title}
                                        </span>
                                    </th>

                                )
                            }

                        </tr>

                    </thead>

                    <tbody ref={tableRef}>

                        {props.children}

                    </tbody>

                </table>

            </div >

        </div>
    )
}