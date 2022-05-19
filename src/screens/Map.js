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
                console.log(location)
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