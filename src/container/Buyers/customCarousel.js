import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    Image,
    Dimensions,
    TouchableOpacity
} from "react-native";
import StarRating from 'react-native-star-rating';

import MapView from "react-native-maps";

const Images = [
    { uri: "https://i.imgur.com/sNam9iJ.jpg" },
    { uri: "https://i.imgur.com/N7rlQYt.jpg" },
    { uri: "https://i.imgur.com/UDrH0wm.jpg" },
    { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 3.2;
const CARD_WIDTH = CARD_HEIGHT - 40;

// const opacity = this.animation.interpolate({
//     inputRange,
//     outputRange: [0.35, 1, 0.35],
//     extrapolate: "clamp",
// });

// const interpolations = this.state.markers.map((marker, index) => {
//     const inputRange = [
//       (index - 1) * CARD_WIDTH,
//       index * CARD_WIDTH,
//       ((index + 1) * CARD_WIDTH),
//     ];
//     const scale = this.animation.interpolate({
//       inputRange,
//       outputRange: [1, 2.5, 1],
//       extrapolate: "clamp",
//     });
//     const opacity = this.animation.interpolate({
//       inputRange,
//       outputRange: [0.35, 1, 0.35],
//       extrapolate: "clamp",
//     });
//     return { scale, opacity };
//   });

export default class CustomCarousel extends Component {


    state = {
        markers: [
            {
                coordinate: {
                    latitude: 45.524548,
                    longitude: -122.6749817,
                },
                title: "Best Place",
                description: "This is the best place in Portland",
                image: Images[0],
            },
            {
                coordinate: {
                    latitude: 45.524698,
                    longitude: -122.6655507,
                },
                title: "Second Best Place",
                description: "This is the second best place in Portland",
                image: Images[1],
            },
            {
                coordinate: {
                    latitude: 45.5230786,
                    longitude: -122.6701034,
                },
                title: "Third Best Place",
                description: "This is the third best place in Portland",
                image: Images[2],
            },
            {
                coordinate: {
                    latitude: 45.521016,
                    longitude: -122.6561917,
                },
                title: "Fourth Best Place",
                description: "This is the fourth best place in Portland",
                image: Images[3],
            },
        ],
        region: {
            latitude: 45.52220671242907,
            longitude: -122.6653281029795,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
        },
    };
    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
    }



    render() {
        const interpolations = this.state.markers.map((marker, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                ((index + 1) * CARD_WIDTH),
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: "clamp",
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: "clamp",
            });
            return { scale, opacity };
        });
        return (
            <View style={styles.container}>
                <MapView
                    ref={map => this.map = map}
                    initialRegion={this.state.region}
                    style={styles.container}
                >
                    {this.state.markers.map((marker, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: interpolations[index].scale,
                                },
                            ],
                        };
                        const opacityStyle = {
                            opacity: interpolations[index].opacity,
                        };
                        return (
                            <MapView.Marker key={index} coordinate={marker.coordinate}>
                                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                    <Animated.View style={[styles.ring, scaleStyle]} />
                                    <View style={styles.marker} />
                                </Animated.View>
                            </MapView.Marker>
                        );
                    })}
                </MapView>
                <Animated.ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: this.animation,
                                    },
                                },
                            },
                        ],
                        { useNativeDriver: true }
                    )}
                    style={styles.scrollView}
                    contentContainerStyle={styles.endPadding}
                >

                    {/* onPress={() => Actions.Post({ item: item, origin: this.props.currentRegion })} */}
                    {this.state.markers.map((marker, index) => (
                        // <TouchableOpacity style={styles.sliderMain} key={index} >
                        //     <View style={styles.sliderMain2}>
                        //         <View style={{
                        //             height: 212, width: 141,
                        //             borderRadius: 8, marginVertical: 5, marginHorizontal: 5,
                        //         }}>
                        //             <Image source={marker.image} style={{
                        //                 height: 137, width: '100%',
                        //                 resizeMode: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8
                        //             }} />
                        //             <View style={{
                        //                 padding: 4, backgroundColor: '#8592AD', height: 72, borderBottomLeftRadius: 8,
                        //                 borderBottomRightRadius: 8, paddingLeft: 7
                        //             }}>
                        //                 <Text style={{ color: "#fff", fontSize: 16, fontWeight: 'bold' }}>Item Title </Text>
                        //                 <Text style={{ color: "#fff", fontSize: 11 }}>By ChefName </Text>
                        //                 {/* <View style={{ flexDirection: 'row', marginTop: 4 }}> */}
                        //                     {/* <StarRating
                        //                         starSize={12}
                        //                         disabled={false}
                        //                         maxStars={5}
                        //                         rating={4}
                        //                         emptyStarColor={'#FFC726'}
                        //                         fullStarColor={'#FFC726'}
                        //                     // selectedStar={(rating) => this.onStarRatingPress(rating)}
                        //                     /> */}
                        //                 {/* </View> */}
                        //             </View>
                        //         </View>
                        //     </View>
                        // </TouchableOpacity>
                        <TouchableOpacity style={styles.card} key={index}>
                            <Image
                                source={marker.image}
                                style={styles.cardImage}
                                resizeMode="cover"
                            />
                            <View style={styles.textContent}>
                                <Text numberOfLines={1} style={styles.cardtitle}>Dish Title</Text>
                                <Text numberOfLines={1} style={styles.cardtitle}>By ChefName</Text>
                                <StarRating
                                    starSize={12}
                                    disabled={false}
                                    maxStars={5}
                                    rating={4}
                                    emptyStarColor={'#FFC726'}
                                    fullStarColor={'#FFC726'}
                                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </Animated.ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
    },
    sliderMain: {
        height: 226, position: 'absolute', bottom: 1, marginLeft: 3,
        zIndex: 1000
    },
    sliderMain2: { height: 224, width: 151, elevation: 20 }
});
