import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import MapView from 'react-native-maps'
import { FontAwesome } from '@expo/vector-icons';
import { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { async } from '@firebase/util';

const Map = () => {

    const [latitude, setLatitude] = React.useState('')
    const [longitude, setLogitude] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const mapStyle = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ebe3cd"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#523735"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#f5f1e6"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#c9b2a6"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#dcd2be"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#ae9e90"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#93817c"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#a5b076"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#447530"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f1e6"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#fdfcf8"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f8c967"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#e9bc62"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e98d58"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#db8555"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#806b63"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#8f7d77"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ebe3cd"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#b9d3c2"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#92998d"
                }
            ]
        }
    ]

    useEffect(() => {
        (async () => {
            setLoading(true)
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getLastKnownPositionAsync({});
            if (location) {
                setLatitude(location.coords.latitude)
                setLogitude(location.coords.longitude)
                setLoading(false)
            }
        })();
    }, []);

    return (
        <View style={styles.container} >

            {
                loading
                    ? <Text>Wait while we load the map</Text>
                    : <>
                        <MapView
                            style={{ height: '100%', width: '100%' }}
                            initialRegion={{
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            customMapStyle={mapStyle}
                        >
                            <Marker
                                coordinate={{ latitude: latitude, longitude: longitude }}
                            />
                        </MapView>
                    </>
            }

        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})