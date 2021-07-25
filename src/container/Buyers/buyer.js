import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FIcon from 'react-native-vector-icons/FontAwesome'
import { Platform, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';


export default class Buyer extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        // this.imageMap = require('../../assets/Images/drawable-hdpi/map.png')
        // this.imageGrid = require('../../assets/Images/drawable-hdpi/menu.png')
    }


    closeControlPanel = () => {
        this._drawer.close()
    };

    openControlPanel = () => {
        this._drawer.open()
    };

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#444F63' }} >
                <View style={{ marginLeft: '3%' }}>
                    {[...Array(3)].map((x, i) =>
                        <View key={i} style={{ height: 230, marginVertical: 12 }}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {[...Array(4)].map((x, i) =>
                                    <View key={i} style={{ height: 224, width: 151, zIndex:-1000}}>
                                        <View style={{
                                            height: 25, width: 25, justifyContent: 'center',
                                            alignItems: 'center', borderTopRightRadius: 12, backgroundColor: 'pink',
                                            position: 'absolute', top: -1, right: -1, zIndex: 1000
                                        }}>
                                            <Text style={{ color: "#fff", fontSize: 11 }}>$5 </Text>
                                        </View>
                                        <View style={{
                                            height: 212, width: 141, borderColor: '#5e697c',
                                            borderWidth: 1, borderRadius: 8, marginVertical: 5, marginHorizontal: 5,
                                        }}>
                                            <Image source={require('../../assets/Buyers/cakes.jpg')} style={{
                                                height: 137, width: '100%',
                                                resizeMode: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8
                                            }} />
                                            <View style={{
                                                padding: 4, backgroundColor: '#343A52', height: 72, borderBottomLeftRadius: 8,
                                                borderBottomRightRadius: 8
                                            }}>
                                                <Text style={{ color: "#fff", fontSize: 16, fontWeight: 'bold' }}>Nearby </Text>
                                                <Text style={{ color: "#fff", fontSize: 11 }}>By Nemdy </Text>
                                                <View style={{ flexDirection: 'row', marginTop: 4 }}>
                                                    {[...Array(4)].map((x, i) =>
                                                        <FIcon name={"star"} size={13} color={'#fac42e'} key={i}
                                                            style={{ marginHorizontal: 1 }} />
                                                    )}
                                                    {[...Array(1)].map((x, i) =>
                                                        <FIcon name={"star-o"} color={'#fff'} size={13} key={i} style={{ marginHorizontal: 1 }} />
                                                    )}
                                                </View>
                                            </View>


                                        </View>
                                    </View>
                                )}
                            </ScrollView>
                        </View>
                    )}
                </View>
            </ScrollView>
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
});