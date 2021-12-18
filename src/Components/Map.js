import React, {useState}  from 'react';
import PropTypes from 'prop-types';
import {SVGMap, CheckboxSVGMap} from "react-svg-map";
import "react-svg-map/lib/index.css";
import {Link, Outlet, useParams} from "react-router-dom";
import {getLocationId, getLocationName, slugify} from "../utils";
import {getMapBySlug} from "../data";


function Map(props) {

    const params = useParams();
    const map = getMapBySlug(params.mapSlug);

    const [pointedLocation, setPointedLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedLocations, setSelectedLocations] = useState([]);

    const handleLocationMouseOver = (event) => {
        setPointedLocation(getLocationName(event));
    }

    const handleLocationMouseOut = () => {
        setPointedLocation(null);
    }

    const handleLocationClick = (event) => {
        const clickedLocation = getLocationName(event);
        setSelectedLocation(clickedLocation);
    }

    const handleOnChange = (locations) => {
        const locationNames = locations.map((location) => location.ariaLabel);
        setSelectedLocations(locationNames);
    }

    const MapLocations = () => (
            <ul>
                {map.locations.map((location) => (<li key={location.id}>{location.name}</li>))}
            </ul>
        )

    return (
        <div className={"map"}>

            <Link className={"home-link"} to={"/"}>Home</Link>


            <div className="examples__block__info">
                <div className="examples__block__info__item">
                    Pointed location: {pointedLocation}
                </div>
                <div className="examples__block__info__item">
                    Clicked location: {selectedLocation}
                </div>
                <div className="examples__block__info__item">
                    Selected locations: {selectedLocations}
                </div>
            </div>
            <CheckboxSVGMap
                map={map}
                onLocationMouseOver={handleLocationMouseOver}
                onLocationMouseOut={handleLocationMouseOut}
                // onLocationClick={handleLocationClick}
                onChange={handleOnChange}
            />
            {/*<MapLocations />*/}
        </div>

    );
}

export default Map;
