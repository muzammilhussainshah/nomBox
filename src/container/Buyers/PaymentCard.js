import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/FontAwesome'
import { Platform, StyleSheet, Text, View, ScrollView, Image, Switch, TextInput, Picker, TouchableOpacity } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import ActionTypes from '../../Store/Constant/constant';
import firebase from 'react-native-firebase'
import { orderDetailsAction } from '../../Store/Action/action'
class PaymentCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    onCOD = () => {
        console.log(this.props.orderDetails, 'this.props.orderDetailPaymentCard')
        let orderDetails = this.props.orderDetails
        this.props.orderDetailsDispatch(orderDetails)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    height: 100, backgroundColor: "#fff", paddingLeft: 12
                    // borderBottomColor: "#1493E6", borderBottomWidth: 1
                }}>
                    <TouchableOpacity onPress={() => Actions.pop()} style={{ height: 30, justifyContent: "flex-end" }}>
                        <Icon name={'arrowleft'} size={20} color="#7E7F84" />
                    </TouchableOpacity>
                    <View style={{ height: 60, justifyContent: "center" }}>
                        <Text style={{ color: "#7E7F84", fontSize: 36 }}>Payment options </Text>
                    </View>

                </View>
                <View style={{ height: 40, justifyContent: "center", marginLeft: '4%' }}>
                    <Text style={{ color: "#7E7F84", fontSize: 15, fontWeight: '700' }}>Payment Methods </Text>
                </View>
                {/* <View style={{
                    height: 180, justifyContent: "center", marginVertical: '4%',
                    
                }}> */}
                <View style={{
                    height: 180, backgroundColor: "#22C2BA", marginHorizontal: "3%",
                    borderRadius: 12
                }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{
                            flex: 1,
                            alignItems: "center", flexDirection: "row", marginLeft: '7%'
                        }}>
                            <Image source={require('../../assets/Buyers/cakes.jpg')} style={{
                                height: 20, width: 20, marginHorizontal: "2%", marginRight: '7%',
                                resizeMode: 'cover', borderTopLeftRadius: 2, borderTopRightRadius: 2
                            }} />
                            <Text style={{ color: "#fff", fontSize: 15, fontWeight: '700' }}>
                                Credit Card </Text>
                        </View>
                        <View style={{
                            flex: 1, justifyContent: "flex-start", alignItems: "flex-end",
                            padding: 6
                        }}>
                            <FIcon name={'edit'} size={30} color="#ffff" />
                        </View>
                    </View>
                    <View style={{ flex: 1.5 }}>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{
                                flex: 1, justifyContent: "center", marginLeft: '7%'
                            }}>
                                <Text style={{ color: "#fff", fontSize: 14, fontWeight: '500', marginVertical: 4 }}>
                                    John Doe </Text>
                                <Text style={{ color: "#fff", fontSize: 14, fontWeight: '500', marginVertical: 4 }}>
                                    ... ... ... 4206 </Text>
                                <Text style={{ color: "#fff", fontSize: 14, fontWeight: '500', marginVertical: 4 }}>
                                    Expires 06/21 </Text>

                            </View>
                            <View style={{
                                flex: 1, justifyContent: "flex-end", alignItems: "flex-end",
                                padding: 6, padding: 15, marginBottom: '6%'
                            }}>
                                <Image source={require('../../assets/Buyers/visa.png')} style={{
                                    height: 25, width: 60, marginHorizontal: "8%",
                                    resizeMode: 'cover', borderTopLeftRadius: 2, borderTopRightRadius: 2
                                }} />
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{ marginVertical: '3%' }}>
                    <View style={{
                        height: 45, flexDirection: "row", backgroundColor: '#FFB900',
                        borderRadius: 12, marginHorizontal: "3%"
                    }}>
                        <View style={{
                            flex: 1, justifyContent: 'flex-start', marginLeft: '3%',
                            alignItems: "center", flexDirection: "row",
                        }}>
                            <Image source={require('../../assets/Buyers/paypal.png')} style={{
                                height: 20, width: 85, marginHorizontal: "2%", marginRight: '7%',
                                resizeMode: 'cover', borderTopLeftRadius: 2, borderTopRightRadius: 2
                            }} />
                        </View>
                        <View style={{
                            flex: 1, justifyContent: "center", alignItems: "flex-end",
                            padding: 6,
                        }}>
                            <FIcon name={'edit'} size={30} color="#ffff" />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginBottom: '3%' }}>
                    <View style={{
                        height: 45, flexDirection: "row", backgroundColor: '#F2F2F2',
                        borderRadius: 12, marginHorizontal: "3%"
                    }}>
                        <View style={{
                            flex: 1, justifyContent: 'flex-start', marginLeft: '3%',
                            alignItems: "center", flexDirection: "row",
                        }}>
                            <Image source={require('../../assets/Buyers/and.png')} style={{
                                height: 30, width: 30, marginHorizontal: "2%", marginRight: '7%',
                                resizeMode: 'cover', borderTopLeftRadius: 2, borderTopRightRadius: 2
                            }} />
                            <Text style={{ color: "#000", fontSize: 15, fontWeight: '700' }}>
                                Android Pay </Text>
                        </View>
                        <View style={{
                            flex: 1, justifyContent: "center", alignItems: "flex-end",
                            padding: 6,
                        }}>
                            <FIcon name={'edit'} size={30} color="#8D8F99" />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginBottom: '3%' }} onPress={this.onCOD}>
                    <View style={{
                        height: 45, flexDirection: "row", backgroundColor: '#F2F2F2', justifyContent: 'center',
                        borderRadius: 12, marginHorizontal: "3%"
                    }}>
                        <View style={{
                            flex: 1, justifyContent: 'flex-start', marginLeft: '3%',
                            alignItems: "center", flexDirection: "row",
                        }}>
                            <Image source={require('../../assets/Buyers/cod.png')} style={{
                                height: 30, width: 30, marginHorizontal: "2%", marginRight: '7%',
                                resizeMode: 'cover', borderTopLeftRadius: 2, borderTopRightRadius: 2
                            }} />
                            <Text style={{ color: "#000", fontSize: 15, fontWeight: '700' }}>
                                Cash on delivery </Text>
                        </View>
                        <View style={{
                            flex: 1, justifyContent: "center", alignItems: "flex-end",
                            padding: 6,
                        }}>
                            <FIcon name={'edit'} size={30} color="#8D8F99" />
                        </View>
                    </View>
                </TouchableOpacity>

                {/* <View style={{
                    height: 90, justifyContent: 'flex-end',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={() => {
                        alert("Order Placed Successfully")
                        Actions.BuyerHome()
                    }} style={{
                        height: 45, width: '80%', backgroundColor: '#665EFF', elevation: 21, alignItems: 'center',
                        justifyContent: 'center', padding: 15, borderRadius: 8
                    }}>
                        <Text style={{ fontWeight: '700', fontSize: 16, color: '#fff' }}> Place Order </Text>
                    </TouchableOpacity>
                </View> */}
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
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

let mapStateToProps = state => {
    return {
        Sessions: state.root.Sessions

    };
};
function mapDispatchToProps(dispatch) {
    return ({
        orderDetailsDispatch: (orderDetails) => {
            dispatch(orderDetailsAction(orderDetails))
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(PaymentCard);