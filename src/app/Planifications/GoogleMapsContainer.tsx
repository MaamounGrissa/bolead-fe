/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextInput } from '@patternfly/react-core';
import { Marker, GoogleMap, useJsApiLoader, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import React, { useState, useRef } from 'react';


export const GoogleMapsContainer: React.FunctionComponent = () => {
    const googleKey: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleKey,
        libraries: ['places'],
    })

      const center = { lat: 48.8584, lng: 2.2945 }
    
      const [map, setMap] = useState<any>(/** @type google.maps.Map */ (null))
      const [directionsResponse, setDirectionsResponse] = useState(null)
      const [distance, setDistance] = useState('')
      const [duration, setDuration] = useState('')
    
      /** @type React.MutableRefObject<HTMLInputElement> */
      const originRef: React.MutableRefObject<any> = useRef()
      /** @type React.MutableRefObject<HTMLInputElement> */
      const destiantionRef: React.MutableRefObject<any> = useRef()
    
      if (!isLoaded) {
        return <div>..loadind</div>
      }
    
      async function calculateRoute() {
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
            setDirectionsResponse(results)
            setDistance(results.routes[0].legs[0].distance.text)
            setDuration(results.routes[0].legs[0].duration.text)
      }
    
      function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destiantionRef.current.value = ''
      }

    return (
        <React.Fragment>
            <div className='map-container'>
                <div className='map-content'>
                    <GoogleMap
                        center={center}
                        zoom={15}
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        options={{
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                        }}
                        onLoad={newMap => setMap(newMap)}
                        >
                            <Marker position={center} />
                            {directionsResponse && (
                                <DirectionsRenderer directions={directionsResponse} />
                            )}
                    </GoogleMap>
                </div>
                <div className='map-controls'>
                    <div className='map-controls_inputs'>
                        <div className='map-controls_input_container'>
                            <Autocomplete>
                                <TextInput type='text' placeholder='Destination' ref={destiantionRef} />
                            </Autocomplete>
                        </div>
                        <div className='map-controls_input_container'>
                            <Autocomplete>
                                <TextInput type='text' placeholder='Origin' ref={originRef} />
                            </Autocomplete>
                        </div>
                    </div>
                    <div className='map-controls__button'>
                        <Button variant='primary' onClick={calculateRoute}>Calculer</Button>
                        <Button variant='secondary' onClick={clearRoute}>Effacer</Button>
                    </div>
                </div>
                <div>{distance}</div>
                <div>{duration}</div>
            </div>
        </React.Fragment>
    );
};
