import {useParams} from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './Components.css';
import {usePosition} from './usePosition';

const Browser = (props) => {
    const {info} = useParams();

    const nav = "App Name: " + window.navigator.appName + "\n"
        + "App Version: " + window.navigator.appVersion + "\n"
        + "Cookies Enabled: " + window.navigator.cookieEnabled + "\n"
        + "App Language: " + window.navigator.language + "\n"
        + "App Online: " + window.navigator.onLine + "\n"
        + "Platform: " + window.navigator.platform + "\n"
        + "User-agent header: " + navigator.userAgent + "\n";

    const win = "Window innerHeight: " + window.innerHeight + "\n"
        + "Window innerWidth: " + window.innerWidth + "\n";

    const scr = "Screen Height: " + window.screen.height + "\n"
        + "Screen Width: " + window.screen.width + "\n"
        + "Screen availHeight: " + window.screen.availHeight + "\n"
        + "Screen availWidth: " + window.screen.availWidth + "\n"
        + "Screen colorDepth: " + window.screen.colorDepth + "\n"
        + "Screen pixelDepth: " + window.screen.pixelDepth + "\n";

    const loc = "Location href: " + window.location.href + "\n"
        + "Location hostname: " + window.location.hostname + "\n"
        + "Location pathname: " + window.location.pathname + "\n"
        + "Location protocol: " + window.location.protocol + "\n";

    let geoLocation = "";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocationInfo);
    }

    function displayLocationInfo(position) {
        geoLocation = "GeoLocation longitude: " + position.coords.longitude+ "\n"
            + "GeoLocation latitude: "+ position.coords.latitude;
    }

    const {latitude, longitude} = usePosition();

    return (
        <div className="level1">
            {
            info === "navigator" ? <h2>{nav}</h2> :
                info === "window" ? <h2>{win}</h2> :
                    info === "screen" ? <h2>{scr}</h2> :
                        info === "location" ? <h2>{loc}</h2> :
                            info === "geolocation" ? <h2>latitude: {latitude}<br/>longitude: {longitude}<br/></h2>:
                                null
            }
        </div>
    )
}

export default Browser;