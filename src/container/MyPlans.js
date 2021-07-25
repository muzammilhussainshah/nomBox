import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Image, Text, ActivityIndicator, StatusBar, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Avatar from 'react-native-badge-avatar';
import firebase from 'react-native-firebase';

// const data = [
//     {
//         mealNumber: '310-078-216',
//         date: '17 December 2018',
//         orderPlaced: '$199',

//     },
//     {
//         mealNumber: '310-078-216',
//         orderPlaced: '$199',
//         date: '17 December 2018',
//     },
//     {
//         mealNumber: '310-078-216',
//         orderPlaced: 'CANCELLED',
//         date: '17 December 2018',
//     },
//     {
//         mealNumber: '310-078-216',
//         orderPlaced: '$199',
//         date: '17 December 2018',
//     },
// ]
class MyPlans extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }


    componentDidMount = () => {
        let id = firebase.auth().currentUser.uid
        console.log(id, "ID")
        firebase.database().ref('meals/').once('value', (data) => {
            console.log(data.val(), "DATA")
            this.setState({ data: data.val() })
        })
    }


    render() {
        console.log(this.state.data)
        let dataMap = this.state.data
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="#F7F7FA"
                    barStyle="dark-content"
                />
                {/* //header */}
                <View style={{
                    height: 100, backgroundColor: "#F7F7FA", paddingLeft: 12,
                    // borderBottomColor: "#1493E6", borderBottomWidth: 1
                }}>
                    <TouchableOpacity onPress={() => Actions.pop()} style={{ height: 30, justifyContent: "flex-end", paddingLeft: '3%' }}>
                        <Icon name={'arrowleft'} size={20} color="#000" />
                    </TouchableOpacity>
                    <View style={{ height: 60, justifyContent: "space-between", alignItems: 'center', flexDirection: 'row', paddingHorizontal: '3%' }}>
                        <Text style={{ color: "#000", fontSize: 36 }}>My Plans </Text>

                        <Icon name={'questioncircle'} size={26} color="#FFB701" style={{ paddingRight: '6%' }} />
                    </View>

                </View>
                {(Object.keys(dataMap).length == 0)
                    ?
                    (
                        <ActivityIndicator size={20} color="#000" style={{ marginTop: 12 }} />

                    )
                    :
                    (<ScrollView>
                        <View style={{
                            backgroundColor: '#fff', marginHorizontal: '8%', marginVertical: 12,
                            borderRadius: 12, elevation: 10
                        }}>

                            {
                                Object.values(dataMap).map((data, i) => {
                                    console.log(data, "LISt")
                                    return (
                                        < TouchableOpacity key={i} onPress={() => Actions.MealDescription()}>
                                            <View style={styles.list} >
                                                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ paddingLeft: '5%' }}>
                                                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#000' }}>{data.title}</Text>
                                                        <Text>{new Date(data.mealDay).toLocaleDateString()}</Text>

                                                    </View>
                                                </View>
                                                <View style={{ textAlign: 'right' }}>
                                                    <Text style={
                                                        // data.orderPlaced === 'CANCELLED' ? 
                                                        styles.orderCancelled
                                                        //  : styles.orderPlaced
                                                    }>CANCELLED</Text>
                                                </View>

                                            </View>
                                        </ TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <Text style={{ textAlign: 'center' }}>This is the end of the List …</Text>
                    </ScrollView >)
                }
                <View style={styles.cartNotification}>
                    <Icon name={'shoppingcart'} size={26} color="#fff" style={{ textAlign: 'right' }} />

                </View>
            </View >

        )
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingTop:'2%',
        paddingBottom:'6%',
        borderBottomWidth: 1,
        borderBottomColor: '#E3E3E3'

    },
    orderPlaced: { fontSize: 17, fontWeight: 'bold', color: '#4F7CFE' },
    orderCancelled: { fontSize: 10, fontWeight: 'bold', color: '#FF9057' },
    cartNotification: { bottom: 40, right: 10, position: 'absolute', backgroundColor: '#FF9057', zIndex: 1000, borderRadius: 4, width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }
})
export default MyPlans