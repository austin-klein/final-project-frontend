import React, { useState, useEffect } from 'react';
import './homePage.css';
import NavComponent from '../nav/NavComponent';
import axios from '../axios';

function HomePage({ history }) {
    const [data, setData] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            history.push('/login')
        }

        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            }

            try {
                const { data } = await axios.get('/', config);
                setData(data.data);
            } catch (error) {
                localStorage.removeItem('authToken');
            }
        }
        fetchPrivateData();
    }, [history])


    const logoutHandler = () => {
        localStorage.removeItem('authToken');
        history.push('/login')
    }

    return (
        <div>
            <NavComponent />
            <div>{data}<button onClick={logoutHandler}>Logout</button></div>

        </div>
    );
};

export default HomePage
