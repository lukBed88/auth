import React from "react";
import { NavLink } from "react-router-dom";

export const Start = () => {

    return (
        <>
        <NavLink to='/registration'>Rejestracja</NavLink>
        <br/>
        <NavLink to='/logging'>Logowanie</NavLink>
        <h3>Główna</h3>
        </>
        )
}

export default Start