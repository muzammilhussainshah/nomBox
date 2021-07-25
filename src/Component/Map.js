import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Dimensions, PermissionsAndroid, Image, Platform } from "react-native";
import { View } from 'native-base';
import MapView, { Marker, Circle, AnimatedRegion, Animated } from 'react-native-maps';
var { height, width } = Dimensions.get('window');
import Polyline from '@mapbox/polyline';
import MapViewDirections from 'react-native-maps-directions';
// const axios = require('axios');

const APIKEY = 'AIzaSyBlx-ZOQsRgR_cfZ7V7vjanud3DhTQVyTE';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRegion: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
                // currentRegion: true
            }
        };
    }

    // componentDidMount() {
    //     // find your origin and destination point coordinates and pass it to our method.
    //     // I am using Bursa,TR -> Istanbul,TR for this example
    //     this.getDirections()
    // }

    // getDirections = async (startLoc, destinationLoc) => {
    //     try {
    //         let origin = {
    //             latitude: 37.78825,
    //             longitude: -122.4324
    //         }
    //         let destination = {
    //             latitude: this.props.map.latitude,
    //             longitude: this.props.map.longitude
    //         };
    //         let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=walking&key=${APIKEY}`)
    //         let respJson = await resp.json();
    //         console.log(respJson,"RESPJSON")
    //         let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
    //         console.log(points,"points")
    //         let coords = points.map((point, index) => {
    //             return {
    //                 latitude: point[0],
    //                 longitude: point[1]
    //             }
    //         })
    //         console.log(coords,"coords")
    //         this.setState({ coords: coords })
    //         return coords
    //     } catch (error) {
    //         alert(error)
    //         return error
    //     }
    // }

    render() {
        // let origin = {

        //     // latitude:37.788122,
        //     // longitude:  -122.432406
        //     latitude: 37.78825,
        //     longitude: -122.4324
        // }
        // let destination = {

        //     // latitude: 37.788172,
        //     // longitude: -122.432029
        //     latitude: this.props.map.latitude,
        //     longitude: this.props.map.longitude
        // };
        let arr = []
        // this.props.origin.currentRegion = true
        arr.push(this.props.origin)
        arr.push(this.props.destination)
        // console.log(this.state.startCoords, "STARTCOORDSTATE")
        // console.log(this.state.endCoords, "endCoordsTATE")
        // let curRegion = this.state.currentRegion
        // console.log(this.state.currentRegion, "curent region",
        //     this.props.map, "mapProps")
        // console.log(this.state.coords, "COORDS")
        return (
            <MapView
                style={styles.map}
                region={this.props.origin !== null || this.props.origin !== undefined ? this.props.origin : this.state.currentRegion}
                minZoomLevel={17}
            >
                {arr.map((marker, index) => {
                    console.log(marker, 'MArkerMAp')
                    console.log(this.props.carouselIndex == index, 'this.props.carouselIndex == indexMAp')

                    return (
                        <Marker
                            key={index}
                            coordinate={marker}
                        >
                            <View style={(marker.longitudeDelta || marker.longitudeDelta !== null) ? styles.current : (this.props.carouselIndex == index) == true ? styles.selectedChef : styles.remainigChef}>
                                <Image resizeMode="cover" source={
                                    (marker.longitudeDelta || marker.longitudeDelta !== null) ?
                                        require('../assets/Images/drawable-ldpi/home.png') : require('../assets/Images/drawable-ldpi/dp.png')
                                } />
                            </View>
                        </Marker>
                    )
                })
                }
                <MapViewDirections
                    origin={this.props.origin}
                    destination={this.props.destination}
                    apikey={APIKEY}
                    mode={"walking"}
                    strokeColor="hotpink"
                    strokeWidth={6}
                // optimizeWaypoints={true}
                />
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
export default connect(mapStateToProps, mapDispatchToProps)(Map);
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