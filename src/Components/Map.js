import {SVGMap, CheckboxSVGMap} from "react-svg-map";
import USA from '@svg-maps/usa.states-territories'
import World from '@svg-maps/world'
import WorldCapitals from '@svg-maps/world.capitals'
import "react-svg-map/lib/index.css";
import {useEffect, useState} from "react";
import {getLocationId, getLocationName} from "../utils";

function Map() {

    const [pointedLocation, setPointedLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedLocations, setSelectedLocations] = useState([]);

    const handleLocationMouseOver = (event) => {
        const pointedLocation = getLocationName(event);
        setPointedLocation(pointedLocation);
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

    const pathClass = (location, index) => {
        console.log(location, index);
    }

    const StatesList = () => {
        return (
            <ul>
                {USA.locations.map((location) => {
                    return (<li key={location.id}>{location.name}</li>)
                })}
            </ul>
        )
    }

    return (
        <section>
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
                map={USA}
                onLocationMouseOver={handleLocationMouseOver}
                onLocationMouseOut={handleLocationMouseOut}
                // onLocationClick={handleLocationClick}
                onChange={handleOnChange}
            />
            <StatesList />
        </section>

    );
}

export default Map;
