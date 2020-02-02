import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../components/menu';
import Login from '../components/login';

export default function Home(){
    return(
        <Fragment >
            <Menu />
            <div className="container">
                <h1>WELCOME TO STARTDEV REACT COURSE</h1>
                <Link to="/allusers">
                    <button className="button"> LISTA ALLL USERS</button>
                </Link>
                <Login />
            </div>
        </Fragment>
    );
}