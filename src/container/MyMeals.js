import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Image, Text, ImageBackground, StatusBar, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Avatar from 'react-native-badge-avatar';


class MyMeals extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="#2A2E43"
                    barStyle="light-content"
                />
                {/* //header */}
                <View style={{
                    height: 60, backgroundColor: "#2A2E43", paddingLeft: 12,flexDirection:'row',alignItems:'center'
                }}>
                    <TouchableOpacity onPress={()=>Actions.pop()} style={{  marginLeft: '3%' }}>
                        <Icon name={'arrowleft'} size={20} color="#fff" />
                    </TouchableOpacity>
                    <View style={{ marginLeft:'24%'}}>
                        <Text style={{ color: "#fff", fontSize: 30 }}>My Meals </Text>
                    </View>

                </View>

                <ScrollView>
                    <View style={{
                        backgroundColor: '#fff', marginHorizontal: '8%', marginVertical: 12,
                        borderRadius: 12, elevation: 10
                    }}>

                        {
                            data.map((data, i) => {
                                return (
                                    < View style={styles.list} key={i}>
                                        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ paddingLeft: '5%' }}>
                                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#000' }}>{data.mealNumber}</Text>
                                                <Text>{data.date}</Text>

                                            </View>
                                        </View>
                                        <View style={{ textAlign: 'right' }}>
                                            <Text style={data.orderPlaced === 'CANCELLED' ? styles.orderCancelled : styles.orderPlaced}>{data.orderPlaced}</Text>
                                        </View>

                                    </View>
                                )
                            })
                        }
                    </View>
                    <Text style={{ textAlign: 'center' }}>This is the end of the List …</Text>
                </ScrollView >
                
                <View style={styles.cartNotification}>
                    <Icon name={'shoppingcart'} size={26} color="#fff" style={{ textAlign: 'right' }} />

                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5%',
        borderBottomWidth: 1,
        borderBottomColor: '#E3E3E3',
        borderStyle: 'dashed'

    },
    orderPlaced: { fontSize: 17, fontWeight: 'bold', color: '#4F7CFE' },
    orderCancelled: { fontSize: 10, fontWeight: 'bold', color: '#FF9057' },
    cartNotification: { bottom: 40, right: 10, position: 'absolute', backgroundColor: '#FF9057', zIndex: 1000, borderRadius: 4, width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }
})
export default MyMeals