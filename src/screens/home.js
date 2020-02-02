import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
    return(
        <div className="container">
            <h1>WELCOME TO STARTDEV REACT COURSE</h1>
            <Link to="/allusers">
                <button className="button"> LISTA ALLL USERS</button>
            </Link>
        </div>
    );
}