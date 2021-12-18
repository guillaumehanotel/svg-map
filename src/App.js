import './App.scss';
import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {slugify} from "./utils";
import {getMaps} from "./data";

function App() {

    const maps = getMaps()

    return (
        <div className="map-list">
            {maps.map((map, index) => (
                <Link className={"map-link"} key={index} to={`maps/${slugify(map.label)}`}>{map.label}</Link>)
            )}
        </div>
    );
}

export default App;
