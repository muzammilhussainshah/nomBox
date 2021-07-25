import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Dimensions, PermissionsAndroid, Image, Platform, ActivityIndicator, Text } from "react-native";
import { View } from 'native-base';
import MapView, { Marker, Circle, AnimatedRegion, Animated } from 'react-native-maps';
var { height, width } = Dimensions.get('window');
import Polyline from '@mapbox/polyline';
import MapViewDirections from 'react-native-maps-directions';
import SystemSetting from 'react-native-system-setting'

// const axios = require('axios');

const APIKEY = 'AIzaSyBlx-ZOQsRgR_cfZ7V7vjanud3DhTQVyTE';

class MapSeller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // currentRegion: null,
            latitude: null,
            longitude: null,
            error: null
        };
    }


    // componentDidMount = () => {
    //     // console.log(navigator.geolocation.getCurrentPosition(success => console.log(success)), 'navigatro')
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             console.log(position, "POSItion");

    //             if (position.coords.latitude !== null || position.coords.latitude !== undefined) {
    //                 this.setState({
    //                     latitude: position.coords.latitude,
    //                     longitude: position.coords.longitude,
    //                     error: null,
    //                 });
    //             }
    //         },
    //         (error) => this.setState({ error: error.message }),
    //         { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    //     );
    // }

    componentDidMount = () => {
        try {
            SystemSetting.isLocationEnabled().then((enable) => {
                console.log(enable, 'enable')
                if (enable === false) {
                    // alert('LOcaTION IS '+ enable+"")
                    Alert.alert(
                        'Your Device Location is OFF ',
                        'Please allow access for getting current location',
                        [
                            {
                                text: 'Deny', onPress: () => {

                                }
                            },
                            {
                                text: 'Access', onPress: () => {
                                    SystemSetting.switchLocation(() => {
                                        console.log('switch location successfully');
                                        navigator.geolocation.getCurrentPosition(
                                            (position) => {
                                                console.log(position)
                                                this.setState({
                                                    latitude: position.coords.latitude,
                                                    longitude: position.coords.longitude,

                                                })
                                            },
                                            (error) => {
                                                alert(error)
                                                console.log('LOCATION error', error)
                                                // if(error){
                                                //   alert('To get current Location go to setting and trun on location')
                                                // }
                                            },
                                            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
                                        );
                                    })
                                }
                            },
                        ],
                        { cancelable: false }
                    )
                } else {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            console.log(position, "position")
                            this.setState({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            })
                        },
                        (error) => {
                            // this.setState({ error: error.message });
                            console.log('LOCATION error', error)
                            if (error) {
                                alert('To get current Location go to setting and trun on location')
                            }
                        },
                        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
                    );
                }
                const state = enable ? 'On' : 'Off';

                console.log('Current location is ' + state);
            })
        }
        catch (error) {
            alert(error)
        }

    }


    render() {

        let currentPosition = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        }
        console.log(currentPosition, "CurrentPosition")
        console.log(this.state.latitude, "this.state.latitude")
        return (

            this.state.latitude == null || this.state.latitude == undefined ?
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {/* <MapView mapType={"none"}
                        style={styles.map} /> */}
                    <View style={{ zIndex: 1000 }}>
                        <ActivityIndicator size={40} color="#FF8A48" />
                        <Text style={{ color: "#FF8A48" }}>Loading...</Text>
                    </View>
                </View>
                :
                <MapView
                    style={styles.map}
                    region={
                        currentPosition
                    }
                    mapType={this.state.latitude == null || this.state.latitude == undefined ? "none" : "standard"}
                    minZoomLevel={17}
                >
                    <Marker
                        coordinate={{ latitude: currentPosition.latitude, longitude: currentPosition.longitude }}
                    >
                        <View style={styles.current}>
                            <Image resizeMode="cover" source={require('../assets/Images/drawable-ldpi/home.png')} />
                        </View>
                    </Marker>
                </MapView>

        );
    }
}
let mapStateToProps = state => {
    return {


    };
};
function mapDispatchToProps(dispatch) {
    return ({

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(MapSeller);
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: height,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        borderRadius: 20
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20

    },
    selectedChef: { borderWidth: 2, borderColor: '#FF8A48', borderRadius: 20 },
    remainigChef: { borderWidth: 2, borderColor: '#000', borderRadius: 20 },
    current: {}
});
//     fetch(`https://api.foursquare.com/v2/users/self/lists/explore?client_id=NXGXZYQDBVGPZXDUE2OQ01MHZHSBRQTYZGT40NMNZFVYGWR0&client_secret=EGAFRTG45RXYMNIS3N2B51TTN1XGA4WTEHHNSIF0UVIWAMAR&v=20180323&radius=5000&limit=15&ll=${currentUser.latitude},${currentUser.longitude}&query=${arr}`)
//         .then(response => {
//             return response.json();
//         }).then(data => {
//             // Work with JSON data here
//             console.log(data,'DATA')
//             // const items = data.response.groups[0].items
//             // this.setState({ placesList: [items[0].venue, items[1].venue, items[2].venue] })
//             // items.map(item => {
//             //     allList.push(item.venue);
//             //     this.setState({ allList })
//             // })
//         }).catch(err => {
//             console.log(err)
//             // Do something for an error here
//         });



    // getDistance(lat1, lon1, lat2, lon2, unit) {
        //     console.log(lat1, lon1, lat2, lon2, "KATKNG")
        //     if ((lat1 == lat2) && (lon1 == lon2)) {
            //         return 0;
            //     }
            //     else {
                //         let radlat1 = Math.PI * lat1 / 180;
                //         let radlat2 = Math.PI * lat2 / 180;
                //         let theta = lon1 - lon2;
                //         let radtheta = Math.PI * theta / 180;
                //         let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                //         if (dist > 1) {
                    //             dist = 1;
                    //         }
                    //         dist = Math.acos(dist);
    //         dist = dist * 180 / Math.PI;
    //         dist = dist * 60 * 1.1515;
    //         if (unit == "K") { dist = dist * 1.609344 }
    //         if (unit == "N") { dist = dist * 0.8684 }
    //         console.log(dist, "DIST")
    //         dist = 10
    //         return dist;
    //     }
    // }


      // getMarker = () => {
                        //     console.log(marker, "marker", index, "index")
                        //     let radius = this.getDistance(curRegion.latitude, curRegion.longitude, marker.latitude, marker.longitude, "K")
                        //     console.log(radius, 'radius')
                        //     return radius
                        // }