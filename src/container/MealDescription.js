import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import {
    Text,
    StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground
} from "react-native";
import {
    Button, Input, Label, Picker,
    Item, View, Textarea
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Avatar from 'react-native-badge-avatar';
import StarRating from 'react-native-star-rating';
import AIcon from 'react-native-vector-icons/AntDesign';

import Map from '../Component/Map'
const uri = '../assets/Images/drawable-mdpi/photo.png'


class AddMealPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mealName: 'Fresh Sushi',
            username: 'Sushi',
            starCount: 3.5,
            reviewsCount: '+47 reviews',
            price: '$8'
        };
    }



    render() {
        console.log("AddMealPlan")
        return (
            <ScrollView style={styles.container}>
                {/* <View> */}
                <TouchableOpacity onPress={() => Actions.pop()} style={{ height: 70, justifyContent: "center", position: 'absolute', zIndex: 1000, left: 10 }}>
                    <AIcon name={'arrowleft'} size={20} color="#fff" />
                </TouchableOpacity>
                <Animatable.View animation="slideInDown" iterationCount={1} >
                    <ImageBackground resizeMode="cover" source={require(uri)} style={styles.image} >
                        <Text style={{ fontSize: 40, color: 'white', marginTop: '55%', marginLeft: '7%' }}>{this.state.mealName}</Text>
                    </ImageBackground>
                </Animatable.View>
                <View
                    style={{ position: 'relative', bottom: 25, marginLeft: '6%', flexDirection: 'row' }}
                >
                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: '75%' }}>
                        <Animatable.View animation="slideInRight" iterationCount={1} style={{ flexDirection: 'row' }}>
                            <View
                                style={{ marginRight: '3%' }}
                            >
                                <Avatar
                                    size={55}
                                    name={this.state.username}
                                    // source="../assets/Images/drawable-mdpi/image.png"
                                    borderColor="black"
                                    borderWidth={2}
                                    placeholder={require("../assets/Images/drawable-mdpi/image.png")}
                                />
                            </View>
                            <View
                                style={{ marginRight: '27%' }}
                            >
                                <StarRating
                                    starSize={22}
                                    disabled={false}
                                    maxStars={5}
                                    rating={this.state.starCount}
                                    emptyStarColor={'#FFC726'}
                                    fullStarColor={'#FFC726'}
                                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                />
                                <Text style={{ fontSize: 13, color: '#B2B2B2' }}>{this.state.reviewsCount}</Text>
                            </View>
                        </Animatable.View>
                        <Animatable.View animation="slideInLeft" iterationCount={1}>
                            <Text style={{ fontSize: 20, color: '#fff', marginVertical: '2%' }}>Description</Text>
                            <Text style={{ fontSize: 13, color: '#B2B2B2' }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</Text>
                        </Animatable.View>
                    </View>

                    <Animatable.View style={{ flexDirection: 'column', alignItems: 'flex-end' }} animation="slideInRight" iterationCount={1} >
                        <View style={{ elevation: 8, alignItems: 'center', justifyContent: 'center', borderRadius: 5, width: 60, height: 60, backgroundColor: '#9C25F3', marginBottom: 10 }}>
                            <Text style={{ fontSize: 26, color: '#fff', fontWeight: 'bold' }}>{this.state.price}</Text>
                        </View>

                        <View style={{ padding: 5, elevation: 8, alignItems: 'center', justifyContent: 'center', borderRadius: 5, width: 70, height: 90, backgroundColor: '#727272' }}>
                            <Text style={{ fontSize: 12, color: '#fff' }}>Only</Text>
                            <Image source={require("../assets/Images/drawable-mdpi/food.png")} resizeMode="contain" style={{ height: 30, width: 30 }} />
                            <Text style={{ fontSize: 26, color: '#fff' }}>6/8</Text>
                        </View>
                    </Animatable.View>
                </View>
                <View style={styles.hr}>
                </View>
                <Animatable.View style={{ flexDirection: 'row', paddingHorizontal: '5%', justifyContent: 'space-between' }} animation="slideInUp" iterationCount={1}>
                    <View style={{ height: 200, width: 250 }}>
                        <Map />
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Icon name='calendar-edit' style={{ color: "white" }} size={40} />
                            <Text style={{ color: '#fff' }}>Launch</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Icon name='square-edit-outline' style={{ color: "white" }} size={40} />
                            {/* <Text>Launciconh</Text> */}
                        </View>

                    </View>
                </Animatable.View>
                <View style={{ borderBottomColor: '#fff', borderBottomWidth: 0.3, marginTop: '3%', marginHorizontal: '3%' }}>
                </View>
                {/* <View> */}
                <View style={{ justifyContent: 'center', alignItems: 'center', height: 80 }}>
                    <TouchableOpacity 
                    onPress={()=>Actions.OrderConsole()}
                    style={{
                        height: 50, justifyContent: "center",
                        width: '80%', borderRadius: 12, backgroundColor: '#3CC9E0'
                    }}>
                        <Text style={{ fontSize: 15, color: "white", textAlign: 'center' }}>Order Console</Text>
                    </TouchableOpacity>
                    {/* </View> */}
                </View>
            </ScrollView>

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
export default connect(mapStateToProps, mapDispatchToProps)(AddMealPlan);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: -1000,
        backgroundColor: '#727272',
        // paddingHorizontal: '5%'
    },
    image: {
        zIndex: -1000,
        // position: 'absolute',
        height: 300
    },
    hr: {
        borderBottomWidth: 0.3,
        borderBottomColor: '#fff',
        marginHorizontal: '4%',
        marginBottom: 12
    }
});