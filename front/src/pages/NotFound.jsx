import React, { Component } from 'react';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#F0F4FF',
        zIndex: '-1',
    },
    bigText: {
        fontSize: "10rem",
        margin: "0",
        zIndex: '2',
    },
    smallText: {
        fontSize: "3rem",
        margin: "0",
        zIndex: '2',
    },
    cloud1: {
        position: 'absolute',
        top: '15%',
        left: '-10%',
        width: '40%',
        zIndex: '1',
    },
    cloud2: {
        position: 'absolute',
        top: '60%',
        left: '40%',
        width: '40%',
        zIndex: '0',
    },
    cloud3: {
        position: 'absolute',
        top: '25%',
        left: '70%',
        width: '40%',
        zIndex: '1',
    },
};

export default function NotFound() {
    return (
        <div style={styles.container} >
            <h1 style={styles.bigText}>404</h1>
            <h2 style={styles.smallText}>Not Found</h2>
            <img style={styles.cloud1} src='/cloud2.png' alt="clouds" />
            <img style={styles.cloud2} src='/cloud2.png' alt="clouds" />
            <img style={styles.cloud3}  src='/cloud2.png' alt="clouds" />
        </div >
    );
}