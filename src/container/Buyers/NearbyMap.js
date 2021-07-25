import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import Dialog, { DialogContent, DialogTitle, SlideAnimation } from 'react-native-popup-dialog';
import { Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform, ActivityIndicator, Alert, Button } from "react-native";
import { View } from 'native-base';
import Map from '../../Component/Map'
import FIcon from 'react-native-vector-icons/FontAwesome'
import StarRating from 'react-native-star-rating';
import geolib from 'geolib'
import Slider from './slider'
import { getChefsAction, clearReduxStateAction } from '../../Store/Action/action'
import Carousel from 'react-native-snap-carousel';
import MapView, { Marker, Circle, AnimatedRegion, Animated } from 'react-native-maps';
import CirecleComponent from '../../Component/circle'
import SystemSetting from 'react-native-system-setting'
import ActionTypes from "../../Store/Constant/constant";
import GoogleAddress from '../../Component/googleAddress'
var { height, width } = Dimensions.get('window');
const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideWidth = wp(41);
const itemHorizontalMargin = wp(2);
const itemWidth = slideWidth //+ itemHorizontalMargin * 2;
const sliderWidth = viewportWidth;



class NearbyMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            latitude: null,
            longitude: null,
            slideIndex: '',
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
            currentRegion: {},
            currentPositionToggle: false,
        };
        this.mapView = null
    }
    componentWillUnmount() {
        this.props.clearReduxState()
    }

    closeControlPanel = () => {
        this._drawer.close()
    };

    openControlPanel = () => {
        this._drawer.open()
    };


    componentDidMount = () => {
        if (this.props.currentLoc == null || this.props.currentLoc == undefined) {
            try {
                SystemSetting.isLocationEnabled().then((enable) => {
                    console.log(enable, 'enable')
                    if (enable === false) {
                        console.log("false")
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

                                                    }, () => {
                                                        let currentUser = {
                                                            latitude: position.coords.latitude,
                                                            longitude: position.coords.longitude,
                                                            latitudeDelta: this.state.latitudeDelta,
                                                            longitudeDelta: this.state.longitudeDelta
                                                        }
                                                        this.props.setCurrentLoc(currentUser)
                                                        this.props.getChefs(currentUser)
                                                    })
                                                },
                                                (error) => {
                                                    alert(JSON.stringify(error))
                                                    console.log('LOCATION error', error)
                                                    // if(error){
                                                    //   alert('To get current Location go to setting and trun on location')
                                                    // }
                                                },
                                                { enableHighAccuracy: true, timeout: 20000 },
                                            );
                                        })
                                    }
                                },
                            ],
                            { cancelable: false }
                        )
                    } else {
                        // SystemSetting.switchLocation(() => {

                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                console.log(position, "position")
                                this.setState({
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude,
                                }, () => {
                                    let currentUser = {
                                        latitude: position.coords.latitude,
                                        longitude: position.coords.longitude,
                                        latitudeDelta: this.state.latitudeDelta,
                                        longitudeDelta: this.state.longitudeDelta
                                    }
                                    this.props.setCurrentLoc(currentUser)
                                    this.props.getChefs(currentUser)
                                }

                                )
                            },
                            (error) => {
                                // this.setState({ error: error.message });
                                console.log('LOCATION error', error)
                                this.setState({ currentPositionToggle: true })
                                // alert(JSON.stringify(error))
                                // if (error) {
                                //     alert('To get current Location go to setting and trun on location')
                                // }
                            },
                            { enableHighAccuracy: true, timeout: 20000 },
                        );
                        // })
                    }
                    const state = enable ? 'On' : 'Off';

                    // alert('Current location is ' + state);
                    console.log('Current location is ' + state);
                })
            }
            catch (error) {
                alert(error)
            }
        }
        else {
            this.setState({ latitude: this.props.currentLoc.latitude, longitude: this.props.currentLoc.longitude }, () => {
                console.log(this.state.latitude, 'Latitude again state')

            })
        }

    }

    getSearchLoc = (loc, address) => {
        console.log(loc, "loc", address, 'address');
        this.setState({
            latitude: loc.lat,
            longitude: loc.lng,
            currentPositionToggle: false
        }, () => {
            let currentUser = {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.longitudeDelta
            }
            this.props.setCurrentLoc(currentUser)
        })
    }


    getMarkersStyle = (marker, index) => {
        if (marker.latitude == this.state.latitude && marker.longitude == this.state.longitude) {
            return (
                <View style={styles.current}>
                    <Image resizeMode="cover" source={require('../../assets/Images/drawable-ldpi/home.png')} />
                </View>
            )
        }
        else {
            if (this.props.carouselIndex == index) {
                return (
                    <View style={styles.selectedChef}>
                        <Image resizeMode="cover" source={require('../../assets/Images/drawable-ldpi/dp.png')} />
                    </View>
                )
            }
            else {
                return (
                    <View style={styles.remainigChef}>
                        <Image resizeMode="cover" source={require('../../assets/Images/drawable-ldpi/dp.png')} />
                    </View>
                )

            }
        }
    }
    render() {

        let curRegion = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,

        }
        // this.props.currentLoc
        console.log(curRegion, 'curRegion********************')
        console.log(this.props.chefsArray, "ChefsArrayNearby")
        console.log("HOMESELLER")
        return (


            this.state.latitude !== null && this.state.longitude !== null ?
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1.5 }}>
                        <View style={styles.container}>
                            <Dialog
                                width="90%"
                                dialogTitle={<DialogTitle style={{ backgroundColor: '#2A2E43' }} textStyle={{ color: '#fff' }} title="Add your current location" />}
                                visible={this.state.currentPositionToggle}
                                dialogAnimation={new SlideAnimation({
                                    toValue: 0, // optional
                                    useNativeDriver: true, // optional

                                })}
                            >
                                <DialogContent>
                                    <View style={{ height: 120 }}>
                                        <GoogleAddress
                                            // type={'Nearbymap'}
                                            ref={(ref) => { this.SearchBox = ref }}
                                            getSearchLoc={this.getSearchLoc} />

                                    </View>
                                </DialogContent>
                            </Dialog>
                            <MapView
                                mapType={"standard"}
                                style={styles.map}
                                region={curRegion}
                                minZoomLevel={17}
                                ref={map => this.map = map}

                            >
                                {this.props.chefsArray.map((marker, index) => {
                                    console.log(marker, 'MArkerMAp')
                                    console.log(marker.latitude == this.state.latitude && marker.longitude == this.state.longitude, 'marker.latitude == this.state.latitude && marker.longitude == this.state.longitude')
                                    console.log(this.props.carouselIndex == index, 'this.props.carouselIndex == indexMAp')
                                    console.log(this.props.carouselIndex, 'this.props.carouselIndex', index, ' == indexMAp')

                                    return (
                                        <Marker
                                            key={index}
                                            coordinate={marker}
                                        >
                                            {this.getMarkersStyle(marker, index)}
                                            {/* <View style={(marker.latitude == this.state.latitude && marker.longitude == this.state.longitude) ? styles.current : (this.props.carouselIndex == index) ? styles.selectedChef : styles.remainigChef}>
                                                <Image resizeMode="cover" source={
                                                    (marker.latitude == this.state.latitude && marker.longitude == this.state.longitude) ?
                                                        require('../../assets/Images/drawable-ldpi/home.png') : require('../../assets/Images/drawable-ldpi/dp.png')
                                                } />
                                            </View> */}
                                        </Marker>
                                    )
                                })}
                                <CirecleComponent chefsArray={this.props.chefsArray} currentRegion={curRegion} />
                            </MapView>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Slider currentRegion={curRegion} />
                        {/* <Slider mapAnimate={this.animate} /> */}
                    </View>
                </View>
                :
                <View>
                    {/* {this.state.currentPositionToggle ?
                        <GoogleAddress
                            // type={'Nearbymap'}
                            ref={(ref) => { this.SearchBox = ref }}
                            getSearchLoc={this.getSearchLoc} />
                        : null
                    } */}
                    <MapView mapType={"none"}
                        style={styles.map} />
                    <View style={{ alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                        <ActivityIndicator size={40} color="#FF8A48" />
                        <Text style={{ color: "#FF8A48" }}>Loading...</Text>
                    </View>
                </View>





        );
    }
}
let mapStateToProps = state => {
    return {
        chefsArray: state.root.chefsArray,
        carouselIndex: state.root.carouselIndex,
        currentLoc: state.root.currentLoc,


    };
};
function mapDispatchToProps(dispatch) {
    return ({
        getChefs: (user) => {
            dispatch(getChefsAction(user))
        },
        setCurrentLoc: (currentLoc) => {
            dispatch({ type: ActionTypes.CURRENTLOC, payload: currentLoc })
        },
        clearReduxState: () => {
            dispatch(clearReduxStateAction())
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(NearbyMap);
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