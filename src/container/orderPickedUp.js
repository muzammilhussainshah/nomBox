import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Image, Text, ImageBackground, StatusBar, TouchableOpacity, ScrollView, FlatList } from 'react-native';
// var data = require('./test-project-87320-export.json');
import Modal from "react-native-modal";

class OrderPickedUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false
        }
        // console.log(data)
    }

    _toggleModalOff = () =>{
        this.setState({ isModalVisible: false },()=>{
            Actions.OrderConsole()
        });
    }
    _toggleModal = () =>{
        this.setState({ isModalVisible: true },()=>{
            Actions.OrderConsole()
        });
    }


    render() {
        // console.log(), 'data')
        return (
            <ScrollView style={{ backgroundColor: '#2A2E43' }}>
                <StatusBar
                    backgroundColor="#2A2E43"
                    barStyle="light-content"
                />
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1,justifyContent:'center',alignItems:'center' }}>
                    <View style={{width:400,height:170,elevation:20,borderRadius:12,backgroundColor:'#2A2E43',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'#fff',fontSize:26,marginBottom:6}}>Your order is confirmed!</Text>
                        <TouchableOpacity onPress={this._toggleModalOff}>
                            <Text style={{color:'#fff',fontSize:16}}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>
                {/* //header */}
                <View style={{
                    height: 100, backgroundColor: "#2A2E43", paddingLeft: 12,
                    borderBottomColor: "#1493E6", borderBottomWidth: 1
                }}>
                    <TouchableOpacity style={{ height: 30, justifyContent: "flex-end" }} onPress={() => Actions.pop()}>
                        <Icon name={'arrowleft'} size={20} color="#ffffff" />
                    </TouchableOpacity>
                    <View style={{ height: 60, justifyContent: "center" }}>
                        <Text style={{ color: "#fff", fontSize: 36 }}>Order Picked up </Text>
                    </View>
                </View>

                <View style={{
                    backgroundColor: '#fff', marginHorizontal: '8%', marginVertical: 12,
                    borderRadius: 12
                }}>
                    <View style={{ height: 70, flexDirection: "row" }}>
                        <View style={{
                            flex: 2, justifyContent: "flex-end", flexDirection: "row",
                            alignItems: "flex-end"
                        }}>
                            <View style={{
                                height: 50, width: 50, borderColor: "#5C5F70", justifyContent: 'center', alignItems: 'center',
                                borderWidth: 3, borderRadius: 25, marginHorizontal: '5%'
                            }}>
                                <Icon name={'user'} size={20} color="#000" />
                            </View>
                            <View style={{ flex: 2, }}>
                                <Text style={{ color: "#494A4D", fontSize: 15, fontWeight: 'bold' }}>Jane Doe </Text>
                                <Text style={{ color: "#B2B9C3", fontSize: 11 }}>#123456 </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <EIcon name={'calendar'} size={30} color="#FF6464" />
                            <Text style={{ color: "#000", fontSize: 11 }}>Lunch </Text>
                        </View>

                    </View>
                    <View style={{
                        height: 160, flexDirection: "row", borderStyle: 'dotted', borderBottomColor: '#F6F4F5',
                        borderBottomWidth: 4
                    }}>
                        <View style={{
                            flex: 2, justifyContent: "center", flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <View style={{
                                height: 83, width: 83, justifyContent: 'center', alignItems: 'center',
                                borderRadius: 12, marginHorizontal: '5%'
                            }}>
                                <Image source={require('../assets/Images/drawable-mdpi/img_1.png')} style={{ resizeMode: 'contain', borderRadius: 12 }} />
                            </View>
                            <View style={{ flex: 2, }}>
                                <Text style={{ color: "#494A4D", fontSize: 15, fontWeight: 'bold', marginBottom: 8 }}>
                                    Tuna Sandwitch </Text>
                                <Text style={{ color: "#B2B9C3", fontSize: 11, }}>Serving 1x </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 25 }}>
                            <Text style={{ color: "#9AAAFD", fontSize: 16, fontWeight: '700' }}>$8.00 </Text>
                            <Text style={{ color: "#B2B9C3", fontSize: 11 }}>Lunch </Text>
                        </View>

                    </View>
                    <View style={{
                        height: 160, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <View style={{
                            height: '80%', width: '80%', backgroundColor: 'grey', elevation: 21,
                            justifyContent: 'center', padding: 15, borderRadius: 8
                        }}>
                            <Text style={{ color: "#666E7E", fontSize: 25, }}>Scheduled Pickup </Text>
                            <Text style={{ color: "#ffff", fontSize: 15, fontWeight: '400' }}>Will Pickup By </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: "#fff", fontSize: 41, fontWeight: '700' }}>8 : 30 </Text>
                                <View style={{ justifyContent: 'flex-end' }}>
                                    <FIcon name={'check-circle-o'} size={25} color="#ffffff" />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        height: 180, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <View style={{
                            height: '90%', width: '80%', backgroundColor: '#fff', elevation: 21,
                            justifyContent: 'center', padding: 15, opacity: 0.5, borderRadius: 8
                        }}>
                            <View style={{ height: 24, flexDirection: "row", justifyContent: "space-between" }}>
                                <Text> abcd d </Text>
                                <Text>$8.02 </Text>
                            </View>
                            <View style={{ height: 24, flexDirection: "row", justifyContent: "space-between" }}>
                                <Text> abcd d </Text>
                                <Text>$8.02 </Text>
                            </View>
                            <View style={{ height: 24, flexDirection: "row", justifyContent: "space-between" }}>
                                <Text> abcd d </Text>
                                <Text>$8.02 </Text>
                            </View>
                            <View style={{ height: 24, flexDirection: "row", justifyContent: "space-between" }}>
                                <Text > Total  </Text>
                                <Text>$8.02 </Text>
                            </View>
                            <View style={{
                                height: 24, flexDirection: "row",
                                justifyContent: "space-between", borderTopColor: "#B2B9C3", borderTopWidth: 1
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
                        <TouchableOpacity 
                        onPress={this._toggleModal}
                        style={{
                            height: 45, width: '80%', backgroundColor: '#3CC9E0', elevation: 21, alignItems: 'center',
                            justifyContent: 'center', padding: 15, borderRadius: 8
                        }}>
                            <Text style={{ fontWeight: '700', fontSize: 16, color: '#fff' }}> Confirm Order </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

})
export default OrderPickedUp