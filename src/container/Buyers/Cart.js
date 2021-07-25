import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/FontAwesome'
import { Platform, StyleSheet, Text, View, ScrollView, Image, Switch, TextInput, Picker, TouchableOpacity } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';

export default class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    proceedToPayment = () => {
        console.log(this.props.orderDetails, 'this.props.orderDetails')
        Actions.PaymentCard({ orderDetails: this.props.orderDetails })
    }

    render() {
        return (
            // <ScrollView style={{ backgroundColor: '#fff' }} >
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={{
                    height: 141, backgroundColor: "#fff", paddingLeft: 12,
                    // borderBottomColor: "#1493E6", borderBottomWidth: 1
                }}>
                    <TouchableOpacity style={{ height: 50, justifyContent: "flex-end" }} onPress={() => Actions.pop()}>
                        <Icon name={'arrowleft'} size={20} color="#454F63" />
                    </TouchableOpacity>
                    <View style={{ height: 80, justifyContent: "center" }}>
                        <Text style={{ color: "#454F63", fontSize: 36, fontWeight: 'bold' }}>Cart </Text>
                    </View>
                </View>
                <View style={{ flex: 1, marginHorizontal: '4%' }}>
                    <View style={{
                        height: 112, flexDirection: "row", borderStyle: 'dotted', borderBottomColor: '#F6F4F5',
                        borderBottomWidth: 4
                    }}>
                        <View style={{
                            flex: 1, justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Image source={{ uri: this.props.uri }}
                                style={{ resizeMode: 'cover', borderRadius: 12, height: '100%', width: '100%' }} />
                        </View>
                        <View style={{
                            flex: 1, justifyContent: "center",
                            alignItems: "center", marginLeft: '2%'
                        }}>
                            <View style={{ flex: 2, }}>
                                <Text style={{ color: "#494A4D", fontSize: 15, fontWeight: 'bold', marginBottom: 8 }}>
                                    Tuna Sandwitch </Text>
                                <Text style={{ color: "#000", fontSize: 11, }}>Quantity: {this.props.quantity}</Text>
                                <View style={{marginTop:6,width:"100%"}}>
                                    <StarRating
                                        starSize={12}
                                        disabled={false}
                                        maxStars={5}
                                        rating={this.props.rating}
                                        emptyStarColor={'#FFC726'}
                                        fullStarColor={'#FFC726'}
                                    // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    />
                                </View>
                            </View>

                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 25 }}>
                            <Text style={{ color: "#9AAAFD", fontSize: 16, fontWeight: '700' }}>$8.00 </Text>
                            <Text style={{ color: "#000", fontSize: 11 }}>Lunch </Text>
                        </View>

                    </View>
                </View>
                <View style={{
                    justifyContent: 'flex-end'
                }}>
                    <View style={{
                        height: 180, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <View style={{
                            height: '90%', width: '80%', backgroundColor: '#fff', elevation: 21,
                            justifyContent: 'center', padding: 15, opacity: 0.5, borderRadius: 8
                        }}>
                            <View style={{ height: 24, flexDirection: "row", justifyContent: "space-between" }}>
                                <Text> Chef's share </Text>
                                <Text>$8.02 </Text>
                            </View>
                            <View style={{ height: 24, flexDirection: "row", justifyContent: "space-between" }}>
                                <Text> Nombox share </Text>
                                <Text>$8.02 </Text>
                            </View>
                            <View style={{ height: 24, flexDirection: "row", justifyContent: "space-between" }}>
                                <Text> Processing Fees </Text>
                                <Text>$8.02 </Text>
                            </View>
                            <View style={{ height: 24, flexDirection: "row", justifyContent: "space-between" }}>
                                <Text > Taxes  </Text>
                                <Text>$8.02 </Text>
                            </View>
                            <View style={{
                                height: 24, flexDirection: "row",
                                justifyContent: "space-between", borderTopColor: "#B2B9C3", borderTopWidth: 1, marginVertical: 5
                            }}>
                                <Text style={{ fontWeight: '700', fontSize: 16 }}> Total </Text>
                                <Text style={{ color: 'blue', fontSize: 17 }}>$8.02 </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        height: 90, justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity onPress={this.proceedToPayment} style={{
                            height: 45, width: '80%', backgroundColor: '#665EFF', elevation: 21, alignItems: 'center',
                            justifyContent: 'center', padding: 15, borderRadius: 8
                        }}>
                            <Text style={{ fontWeight: '700', fontSize: 16, color: '#fff' }}> Proceed to payment </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            // </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    inputStyle: {
        height: 65, borderColor: '#000', borderWidth: 1,
        width: '90%', borderRadius: 5, backgroundColor: '#414F5E',
    },
    inputText: {
        fontSize: 15, color: '#fff', height: 20, margin: 2
    }
});