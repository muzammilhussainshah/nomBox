import React, { Component } from "react";
import { connect } from "react-redux";
import MapView, { Marker, Circle, AnimatedRegion, Animated } from 'react-native-maps';


class CircleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRegion: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
                // currentRegion: true
            },
            index: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps, "NEXCTROPS")
        this.setState({ index: nextProps.carouselIndex })
    }


    render() {
        console.log(this.props.chefsArray, "chefsArrayCIRCLE")
        console.log("Carousel")
        return (
            // this.props.currentRegion == null || this.props.currentRegion == undefined ? this.state.currentRegion : 
            <Circle center={this.props.currentRegion} radius={this.props.chefsArray[this.state.index] !== undefined && this.props.chefsArray[this.state.index] !== null ? this.props.chefsArray[this.state.index].distance + 20 : 41} strokeColor={'#FF8A48'} lineJoin={'round'} />
            // : <View></View>
            // <Circle center={curRegion} radius={this.props.chefsArray[carouselIndex] !== undefined && this.props.chefsArray[carouselIndex] !== null ? this.props.chefsArray[carouselIndex].distance + 6 : 41} strokeColor={'#FF8A48'} lineJoin={'round'} /> */ }

        )
    }
}
let mapStateToProps = state => {
    return {
        // chefsArray: state.root.chefsArray,
        carouselIndex: state.root.carouselIndex,
        // currentRegion: state.root.currentRegion

    };
};
function mapDispatchToProps(dispatch) {
    return ({

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(CircleComponent);
