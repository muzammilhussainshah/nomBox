import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Image, Text, ImageBackground, StatusBar, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Avatar from 'react-native-badge-avatar';

const data = [
    {
        uri: '../assets/Images/drawable-mdpi/image.png',
        dishName: 'Fresh Sushi',
        quantity: '3x',
        orderPlaced: '$199',
        dishId: '#310-078-260',
    },
    {
        uri: '../assets/Images/drawable-mdpi/image.png',
        dishName: 'Fresh Sushi',
        quantity: '3x',
        orderPlaced: '$199',
        dishId: '#310-078-260',
    },
    {
        uri: '../assets/Images/drawable-mdpi/image.png',
        dishName: 'Fresh Sushi',
        quantity: '3x',
        orderPlaced: 'CANCELLED',
        dishId: '#310-078-260',
    },
    {
        uri: '../assets/Images/drawable-mdpi/image.png',
        dishName: 'Fresh Sushi',
        quantity: '3x',
        orderPlaced: '$199',
        dishId: '#310-078-260',
    },
]
class OrderConsole extends Component {
    constructor(props) {
        super(props)
        this.state = {
            seacrh: ""
        }
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#2A2E43' }}>
                <StatusBar
                    backgroundColor="#2A2E43"
                    barStyle="light-content"
                />
                {/* //header */}
                <View style={{
                    height: 100, backgroundColor: "#2A2E43", paddingLeft: 12,
                    borderBottomColor: "#1493E6", borderBottomWidth: 1
                }}>
                    <TouchableOpacity style={{ height: 30, justifyContent: "flex-end" }} onPress={() => Actions.pop()}>
                        <Icon name={'arrowleft'} size={20} color="#ffffff" />
                    </TouchableOpacity>
                    <View style={{ height: 60, justifyContent: "center" }}>
                        <Text style={{ color: "#fff", fontSize: 36 }}>Order Console </Text>
                    </View>
                </View>

                <View style={{
                    backgroundColor: '#fff', marginHorizontal: '8%', marginVertical: 12,
                    borderRadius: 12, flex: 1
                }}>

                    {
                        data.map((data, i) => {
                            return (
                                <TouchableOpacity style={styles.list} key={i} onPress={()=>Actions.OrderPickedUp()}>
                                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                                        <Avatar
                                            size={55}
                                            name={'Saadat Hasan'}
                                            borderColor="black"
                                            borderWidth={2}
                                        // placeholder={require(data.uri)}
                                        />
                                        <View style={{ paddingLeft: '5%' }}>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#000' }}>{data.dishName + ' ' + data.quantity}</Text>
                                            <Text>{data.dishId}</Text>

                                        </View>
                                    </View>
                                    <View style={{ textAlign: 'right' }}>
                                        <Text style={data.orderPlaced === 'CANCELLED' ? styles.orderCancelled : styles.orderPlaced}>{data.orderPlaced}</Text>
                                    </View>

                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

            </ScrollView >
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
        borderRadius: 1,
        borderBottomColor: '#E3E3E3',
        borderStyle: 'dashed',

    },
    orderPlaced: { fontSize: 17, fontWeight: 'bold', color: '#4F7CFE' },
    orderCancelled: { fontSize: 10, fontWeight: 'bold', color: '#FF9057' }
})
export default OrderConsole