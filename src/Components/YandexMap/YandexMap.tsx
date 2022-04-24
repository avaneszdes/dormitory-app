import React, {useEffect} from "react";
import {Map, YMaps} from "react-yandex-maps";

interface Props {
    withControls: boolean
    location: string
    isBig: boolean
}

export default function YandexMap({isBig, location, withControls}: Props) {

    const ymaps = window.ymaps;
    useEffect(() => {
        if (ymaps) {
            window.ymaps = ymaps;
        }
    });

    const locations = location ?
        {
            x: Number.parseInt(location.split(',')[0]),
            y: Number.parseInt(location.split(',')[1])
        }
        :
        {
            x: 53.923249,
            y: 27.594045
        }

    const size = isBig ? {width: 900, height: 500} : {width: 410, height: 400}
    const state = withControls ? {center: [locations.x, locations.y], zoom: 16} :
                                 {center:  [locations.x, locations.y], zoom: 16, controls: []}

    return (
        <YMaps query={{lang: "en_RU", mode: "release", load: "package.full"}} preload={true}>
            <Map
                defaultState={state}
                width={size.width} height={size.height}
            />
        </YMaps>
    );
}
