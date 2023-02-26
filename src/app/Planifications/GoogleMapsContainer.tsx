/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultAdress, mapCenter } from '@app/utils/constant';
import { Button, TextInput } from '@patternfly/react-core';
import { Marker, GoogleMap, useJsApiLoader, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import React, { useState, useRef } from 'react';


export const GoogleMapsContainer: React.FunctionComponent = () => {
    const googleKey: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleKey,
        libraries: ['places'],
    })

    const options = {
        componentRestrictions: { country: "fr" },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [map, setMap] = useState<any>(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null);

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef: React.MutableRefObject<any> = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef: React.MutableRefObject<any> = useRef()
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [originInput, setOriginInput] = useState(defaultAdress)
    const [destinationInput, setDestinationInput] = useState('')


    if (!isLoaded) {
        return <div>..loadind</div>
    }

    const calculateRoute = async () => {
        if (originRef.current.value === '' || destiantionRef.current.value === '') {
        return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results: any = await directionsService.route({
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
        })
        setOriginInput(originRef.current.value)
        setDestinationInput(destiantionRef.current.value)
        //console.log(results)
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

    const clearRoute = () => {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destiantionRef.current.value = ''
    }

   const handleOnOriginPlaceChanged = () => {
        const place = originRef.current.getPlace();
        console.log(place)
        setOriginInput(place.formatted_address)
    }
    
    const handleOnDestinationPlaceChanged = () => {
        const place = destiantionRef.current.getPlace();
        console.log(place)
        setDestinationInput(place.formatted_address)
    }

    // console.log(distance, duration)

    return (
        <React.Fragment>
            <div className='map-container'>
                <div className='map-header'>
                    <div className='map-controls'>
                        <div className='map-controls_inputs'>
                            <div className='map-controls_input_container'>
                                <Autocomplete options={options} onPlaceChanged={handleOnOriginPlaceChanged} >
                                    <TextInput type='text' id='origin-input' placeholder='Origin' ref={originRef} value={originInput} onChange={(newValue) => setOriginInput(newValue)} />
                                </Autocomplete>
                            </div>
                            <div className='map-controls_input_container'>
                                <Autocomplete options={options} onPlaceChanged={handleOnDestinationPlaceChanged} >
                                    <TextInput type='text' id='destination-input' placeholder='Destination' ref={destiantionRef} value={destinationInput} onChange={(newValue) => setDestinationInput(newValue)} />
                                </Autocomplete>
                            </div>
                        </div>
                        <div className='map-controls__button'>
                            <Button style={{ marginRight: "5px" }} variant='primary' onClick={calculateRoute}>Calculer</Button>
                            <Button variant='secondary' onClick={clearRoute}>Effacer</Button>
                        </div>
                    </div>
                    <div className='maps-output'>
                        <h3>Distance de trajet: {distance}</h3>
                        <h3>Durée du trajet: {duration}</h3>
                    </div>
                </div>
                <div className='map-content'>
                    <GoogleMap
                        center={mapCenter}
                        zoom={12}
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        options={{
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                        }}
                        onLoad={newMap => setMap(newMap)}
                        >
                            <Marker position={mapCenter} />
                            {directionsResponse && (
                                <DirectionsRenderer directions={directionsResponse} />
                            )}
                    </GoogleMap>
                </div>
            </div>
        </React.Fragment>
    );
};
