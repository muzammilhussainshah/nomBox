import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground, } from "react-native";
import { View } from 'native-base';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Avatar from 'react-native-badge-avatar';
import StarRating from 'react-native-star-rating';
import EIcon from 'react-native-vector-icons/Entypo';
import AIcon from 'react-native-vector-icons/AntDesign';
import { checkSessionAction } from '../../Store/Action/action'
import Map from '../../Component/Map'
import firebase from 'react-native-firebase'
import Servings from "./servings";
const uri = '../../assets/Images/drawable-mdpi/photo.png'
const servings = 1;

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewsCount: '+47 reviews',
            price: '$8',
            noUser: null
        };
    }

    componentDidMount() {
        let user = firebase.auth().currentUser
        if (user == null || user == undefined) {
            this.setState({ noUser: true })
        } else {
            this.props.checkSession(this.props.item.orderKey)
        }
    }

    onChangeServing = (val) => {
        console.log(val, 'VALCHEXK')
        servings = val
        console.log(servings, "servings")
    }

    onMessage = () => {
        console.log(this.props.Sessions, "SessionCheckPOST")
        let sessions = this.props.Sessions
        console.log(sessions.length, "SESSIONLENGTH")
        if (sessions.length == 0 || sessions == null) {
            Actions.ChatScreen({ recieverId: this.props.item.chefId, orderKey: this.props.item.orderKey })
        } else {
            Actions.ChatList({ recieverId: this.props.item.chefId, orderKey: this.props.item.orderKey })
        }
    }

    onAddToCart = () => {
        let orderDetails = {
            chefId: this.props.item.chefId,
            quantity: servings,
            orderKey: this.props.item.orderKey,
            mealTime: this.props.item.mealTime,
            mealPrice: this.props.item.mealPrice,
            title: this.props.item.title
        }
        Actions.Cart({ uri: this.props.item.image, quantity: servings, rating: this.props.item.rating, orderDetails: orderDetails })
    }

    render() {

        console.log(this.props.Sessions, "PostSessions")
        console.log(this.props.origin, "Postorigin")
        console.log(this.props.item, "Post")
        let data = this.props.item
        let obj = { latitude: data.latitude, longitude: data.longitude }
        return (
            <ScrollView style={styles.container}>
                {/* <View> */}
                <TouchableOpacity onPress={() => Actions.pop()} style={{ height: 70, justifyContent: "center", position: 'absolute', zIndex: 1000, left: 10 }}>
                    <AIcon name={'arrowleft'} size={20} color="#fff" />
                </TouchableOpacity>
                <Animatable.View animation="slideInDown" iterationCount={1} >
                    <ImageBackground resizeMode="cover" source={{ uri: data.image }} style={styles.image} >
                        <Text style={{ fontSize: 40, color: 'white', marginTop: '55%', marginLeft: '7%' }}>{data.title}</Text>
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
                                    placeholder={require("../../assets/Images/drawable-mdpi/image.png")}
                                />
                            </View>
                            <View
                                style={{ marginRight: '27%' }}
                            >
                                <StarRating
                                    starSize={22}
                                    disabled={false}
                                    maxStars={5}
                                    rating={data.rating}
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
                            <Text style={{ fontSize: 26, color: '#fff', fontWeight: 'bold' }}>{data.mealPrice}</Text>
                        </View>

                        <View style={{ padding: 5, elevation: 8, alignItems: 'center', justifyContent: 'center', borderRadius: 5, width: 70, height: 90, backgroundColor: '#727272' }}>
                            <Text style={{ fontSize: 12, color: '#fff' }}>Only</Text>
                            <Image source={require("../../assets/Images/drawable-mdpi/food.png")} resizeMode="contain" style={{ height: 30, width: 30 }} />
                            <Text style={{ fontSize: 26, color: '#fff' }}>6/8</Text>
                        </View>
                    </Animatable.View>
                </View>
                <View style={styles.hr}>
                </View>
                <Animatable.View style={{ flexDirection: 'row', paddingHorizontal: '5%', justifyContent: 'space-between', marginBottom: 12 }} animation="slideInUp" iterationCount={1}>

                    <Servings servingFunc={this.onChangeServing} />
                    {/* <View>
                        <Text style={styles.servings}>Servings</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity onPress={this.onChangeServing.bind(this, 'sub')}><EIcon name={'circle-with-minus'} size={20} color="#CBCBCB" /></TouchableOpacity><Text style={styles.servings}>{this.state.servings}</Text><TouchableOpacity onPress={this.onChangeServing.bind(this, 'add')}><EIcon name={'circle-with-plus'} size={20} color="#FF9057" /></TouchableOpacity>
                        </View>
                    </View> */}
                    <View style={{ alignItems: 'center' }}>
                        <EIcon name={'calendar'} size={40} color="#fff" />
                        <Text style={{ color: '#fff' }}>Lunch</Text>
                    </View>
                </Animatable.View>
                <View style={{ height: 130, borderRadius: 20, width: '90%', alignSelf: 'center', elevation: 20, marginBottom: 20 }}>
                    <Map destination={obj} origin={this.props.origin} />
                </View>


                <Animatable.View animation="slideInUp" iterationCount={1} 
                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
                paddingHorizontal: '5%',paddingVertical:"1%" }}>
                    {this.state.noUser == true ?
                        <TouchableOpacity
                            style={{
                                height: 50, justifyContent: "center", alignItems: 'center', elevation: 21,
                                width: '17%', borderRadius: 12, backgroundColor: '#727272'
                            }}>
                            <Icon name={'wechat'} size={40} color="#fff" />
                        </TouchableOpacity>
                        : <TouchableOpacity
                            onPress={this.onMessage}
                            style={{
                                height: 50, justifyContent: "center", alignItems: 'center',
                                width: '17%', borderRadius: 12, backgroundColor: '#5773FF'
                            }}>
                            <Icon name={'wechat'} size={40} color="#fff" />
                        </TouchableOpacity>

                    }
                    <TouchableOpacity
                        onPress={this.onAddToCart}
                        style={{
                            height: 50, justifyContent: "center",
                            width: '80%', borderRadius: 12, backgroundColor: '#78849E'
                        }}>
                        <Text style={{ fontSize: 15, color: "white", textAlign: 'center' }}>Add to Cart</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </ScrollView>

        );
    }
}
let mapStateToProps = state => {
    return {
        Sessions: state.root.Sessions,
        currentLoc: state.root.currentLoc

    };
};
function mapDispatchToProps(dispatch) {
    return ({
        checkSession: (orderKey) => {
            dispatch(checkSessionAction(orderKey))
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Post);
const styles = StyleSheet.create({
    servings: { fontSize: 21, color: 'white' },

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