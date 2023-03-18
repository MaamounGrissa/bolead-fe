/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultAdress, mapCenter } from '@app/utils/constant';
import { Button, TextInput } from '@patternfly/react-core';
import { CarSideIcon, ClockIcon } from '@patternfly/react-icons';
import { Marker, GoogleMap, useJsApiLoader, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import React, { useState, useRef } from 'react';


export const GoogleMapsContainer: React.FunctionComponent<{
    formData: IPlanification,
    handleSetFormData: (data: any) => void,
}> = (props) => {
    const { formData, handleSetFormData } = props;
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

    React.useEffect(() => {
        if (formData.destination !== '') {
            setDestinationInput(formData.destination)
            if (formData.origin !== '' && formData.destination !== '') {
                setTimeout(() => {
                    document.getElementById('calculate-route')?.click()
                }, 1000)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.destination, formData.origin])

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
        handleSetFormData({
            origin: originRef.current.value,
            destination: destiantionRef.current.value,
            distance: results.routes[0].legs[0].distance.text,
            travelDuration: Math.ceil(results.routes[0].legs[0].duration.value / 60),
            trajetDurationText: results.routes[0].legs[0].duration.text,
            travelMode: 'DRIVING'
        })
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
        setOriginInput(place.formatted_address)
    }
    
    const handleOnDestinationPlaceChanged = () => {
        const place = destiantionRef.current.getPlace();
        setDestinationInput(place.formatted_address)
    }

    return (
        <React.Fragment>
            <div className='map-container'>
                <div className='map-header'>
                    <div className='map-controls'>
                        <div className='map-controls_inputs'>
                            <div className='map-controls_input_container'>
                                <div>Origine</div>
                                <div>
                                    <Autocomplete options={options} onPlaceChanged={handleOnOriginPlaceChanged} >
                                        <TextInput type='text' id='origin-input' placeholder='Origin' ref={originRef} value={originInput} onChange={(newValue) => setOriginInput(newValue)} />
                                    </Autocomplete>
                                </div>
                            </div>
                            <div className='map-controls_input_container'>
                                <div>Destination</div>
                                <div>
                                    <Autocomplete options={options} onPlaceChanged={handleOnDestinationPlaceChanged} >
                                        <TextInput type='text' id='destination-input' placeholder='Destination' ref={destiantionRef} value={destinationInput} onChange={(newValue) => setDestinationInput(newValue)} />
                                    </Autocomplete>
                                </div>
                            </div>
                        </div>
                        <div className='map-controls-result'>
                            <div className='map-controls__button'>
                                <Button id='calculate-route' style={{ marginRight: "5px" }} variant='primary' onClick={calculateRoute}>Calculer</Button>
                                <Button variant='secondary' onClick={clearRoute}>Effacer</Button>
                            </div>
                            <div className='map-result'>
                                <div className='map-result-distance'>
                                   <CarSideIcon color='#555' /> &nbsp; {distance?.length > 0 ? distance : '0 Km'}
                                </div>
                                <div className='map-result-duration'>
                                   <ClockIcon color='#555' /> &nbsp; {duration?.length > 0 ? duration : '0 min'}
                                </div>
                            </div>
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
