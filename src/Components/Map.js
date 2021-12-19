import React, {useEffect, useState} from 'react';
import {SVGMap, CheckboxSVGMap} from "react-svg-map";
import "react-svg-map/lib/index.css";
import {Link, useParams} from "react-router-dom";
import {getLocationId, getLocationName} from "../utils";
import {getMapBySlug} from "../data";

function Map() {

    const params = useParams();
    const map = getMapBySlug(params.mapSlug);
    const mapLocations = (map.locations.map(location => location.name));
    const MAX_TRIES = 3;
    const defaultTooptipStyle = {
        display: 'none'
    };

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [locations, setLocations] = useState(
        Object.fromEntries(mapLocations.map(mapLocation => [mapLocation, false]))
    );
    const [requestedLocation, setRequestedLocation] = useState(null)
    const [tries, setTries] = useState(0);
    const [score, setScore] = useState(0);
    const [tooltipStyle, setTooltypeStyle] = useState(defaultTooptipStyle);
    
    const getLocationIdByLocationName = (name) => map.locations
            .filter(location => location.name === name)
            .map(location => location.id)[0]

    const getUncheckedLocations = () => Object.entries(locations)
        .filter(location => !location[1])
        .map(location => location[0])

    const getCheckedLocations = () => Object.entries(locations)
        .filter(location => location[1])
        .map(location => location[0])

    const getRandomUncheckedLocations = () => {
        const uncheckedLocations = getUncheckedLocations();
        return uncheckedLocations[Math.floor(Math.random() * uncheckedLocations.length)];
    }

    const displayTooltip = (event, isSuccess) => {
        const tooptipStyle = {
            display: 'block',
            top: event.clientY + 10,
            left: event.clientX - 100,
            backgroundColor : isSuccess ? 'green' : 'red'
        };
        setTooltypeStyle(tooptipStyle);
        setTimeout(() => {
            setTooltypeStyle(defaultTooptipStyle);
        }, 500)
    }

    const handleLocationClick = (event) => {
        const clickedLocation = getLocationName(event);

        const requestedLocationId = getLocationIdByLocationName(requestedLocation);

        const isSuccess = clickedLocation === requestedLocation;

        if (isSuccess) {
            
            setScore(prevState => prevState + 10);
            setLocations(prevState => ({
                ...prevState,
                [clickedLocation]: true
            }))
            document.querySelector(`#${requestedLocationId}`).classList.add('found');
            setTries(0);
            setRequestedLocation(getRandomUncheckedLocations());
            
        } else {
            setTries(prevState => prevState + 1);
            if (tries + 1 === MAX_TRIES) {
                document.querySelector(`#${requestedLocationId}`).classList.add('fail')
                setLocations(prevState => ({
                    ...prevState,
                    [requestedLocation]: true
                }))
                setRequestedLocation(getRandomUncheckedLocations());
                setTries(0);
            }
            setScore(prevState => prevState - 5);
        }
        displayTooltip(event, isSuccess);
        setSelectedLocation(clickedLocation);
    }



    useEffect(() => {
        setRequestedLocation(getRandomUncheckedLocations());
    }, []);

    // const handleOnChange = (locations) => {
    //     const locationNames = locations.map((location) => location.ariaLabel);
    //     setLocations(locationNames);
    // }

    return (
        <div className={"map"}>

            <Link className={"home-link"} to={"/"}>Home</Link>

            <div className="examples__block__info">
                <p>Score : {score}</p>
                <p>Requested Location : {requestedLocation} ({tries}/{MAX_TRIES})</p>
                <div className="examples__block__info__item">
                    Clicked location: {selectedLocation}
                </div>
                {/*<div className="examples__block__info__item">*/}
                {/*    Done Locations: {getCheckedLocations()}*/}
                {/*</div>*/}
                <div className="examples__block__info__item">
                    Total : {getCheckedLocations().length} / {mapLocations.length}
                </div>
            </div>
            <SVGMap
                map={map}
                onLocationClick={handleLocationClick}
                // onChange={handleOnChange}
            />
            <div className="map-location-tooltip" style={tooltipStyle}>
                {selectedLocation}
            </div>
        </div>

    );
}

export default Map;
