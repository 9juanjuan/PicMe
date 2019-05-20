import React from 'react';
import styles from '../css/WaitPage.module.css';

export default function WaitPage() {
    return (
        <div>
            <div className={styles.text}>
                <h1>PicMe</h1>
                <h3>Join this Game using the Pin:</h3>
                <h3>1234</h3>
            </div>
            <div className={styles.userListContainer}>
                <ul className={styles.userList}>
                    <li>seil</li>
                    <li>ashish</li>
                    <li>antonio</li>
                    <li>rebecca</li>
                    <li>rebecca</li>
                    <li>chris</li>
                    <li>samson</li>
                </ul>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.startButton}>Start Game</button>
                <button className={styles.cancelButton}>Cancel Game</button>
            </div>
        </div>
    )
}