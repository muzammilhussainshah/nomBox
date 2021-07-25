import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Dimensions, Platform, Image, Text, TouchableOpacity } from "react-native";
import geolib from 'geolib'
import { View } from 'native-base';
import StarRating from 'react-native-star-rating';
import { getCarouselAction } from '../../Store/Action/action'
import Carousel from 'react-native-snap-carousel';
import ActionTypes from '../../Store/Constant/constant'
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


class Slider extends Component {
    constructor(props) {
        super(props);

    }


    _renderItem = ({ item, index }) => {
        console.log(item, 'sliderItem')
        return (
            item.chef ?
                <TouchableOpacity style={styles.sliderMain} onPress={() => Actions.Post({ item: item, origin: this.props.currentRegion })}>
                    <View style={styles.sliderMain2}>
                        <View style={{
                            height: 212, width: 141,
                            borderRadius: 8, marginVertical: 5, marginHorizontal: 5,
                        }}>
                            <Image source={{ uri: item.image }} style={{
                                height: 137, width: '100%',
                                resizeMode: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8
                            }} />
                            <View style={{
                                padding: 4, backgroundColor: '#8592AD', height: 72, borderBottomLeftRadius: 8,
                                borderBottomRightRadius: 8, paddingLeft: 7
                            }}>
                                <Text style={{ color: "#fff", fontSize: 16, fontWeight: 'bold' }}>{item.title} </Text>
                                <Text style={{ color: "#fff", fontSize: 11 }}>By {item.chef} </Text>
                                <View style={{ flexDirection: 'row', marginTop: 4 }}>
                                    <StarRating
                                        starSize={12}
                                        disabled={false}
                                        maxStars={5}
                                        rating={item.rating}
                                        emptyStarColor={'#FFC726'}
                                        fullStarColor={'#FFC726'}
                                    // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity> :
                null
        );
    }



    render() {

        console.log(this.props.currentRegion, "Carousel")
        console.log(this.props.chefsArray, "chefsArray")

        return (

            <Carousel
                activeSlideAlignment={'start'}
                inactiveSlideOpacity={1}
                showSpinner={true}
                spinnerColor={'#8592AD'}
                ref={(c) => { this._carousel = c; }}
                data={this.props.chefsArray}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}

                // onScroll={() => this.setState({ range: this.state.range + 20 }, () => console.log(this.state.range, "RAMNGE"))}
                onSnapToItem={(slideIndex) => {
                    console.log(slideIndex, 'onSnapToIItem')
                    this.props.getCarousel(slideIndex)
                }}
            />




        );
    }
}
let mapStateToProps = state => {
    return {
        chefsArray: state.root.chefsArray,
        // currentRegion:state.root.currentRegion

    };
};
function mapDispatchToProps(dispatch) {
    return ({
        getCarousel: (index) => {
            dispatch({ type: ActionTypes.CAROUSELINDEX, payload: index })
            // dispatch(getCarouselAction(index))
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Slider);
const styles = StyleSheet.create({
    sliderMain: {
        height: 226, position: 'absolute', bottom: 1, marginLeft: 3,
        zIndex: 1000
    },
    sliderMain2: { height: 224, width: 151, elevation: 20 }
});