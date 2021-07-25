import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';;
import { Text, Image, Dimensions, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { Button, Input, Item, View, } from 'native-base';
import MapSeller from '../Component/MapSeller'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Drawer from 'react-native-drawer'
import DrawerComponent from '../Component/DrawerComponent'
const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    main: { paddingLeft: 3 },
}

class HomeSeller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchUser: ''
        };
    }


    closeControlPanel = () => {
        this._drawer.close()
    };

    openControlPanel = () => {
        this._drawer.open()
    };

    render() {
        console.log("HOMESELLER")
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={<DrawerComponent closeDrawer={this.closeControlPanel} />}
                tapToClose={true}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                styles={drawerStyles}
                tweenHandler={(ratio) => ({
                    main: { opacity: (2 - ratio) / 2 }
                })}
            >
                <View
                    style={{ alignItems: 'center', flex: 1 }}
                >




                    <StatusBar
                        backgroundColor="#fff"
                        barStyle="dark-content"
                    />
                    {/* <View style={{ top:3,
                    backgroundColor: '#3ACCE1', marginHorizontal: '8%', height: 70, width: '80%', justifyContent: 'center',
                    alignItems: 'center', borderRadius: 12, elevation: 10, position: 'absolute', flexDirection: 'row'
                }}>
                    <Image source={require('../assets/Images/drawable-mdpi/gift.png')} />

                    <Text style={{ fontSize: 16, paddingLeft: '3%' }}>You have a NEW order!</Text>
                </View> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>



                        <Item style={styles.input}>
                            <TouchableOpacity onPress={this.openControlPanel} style={{ paddingLeft: 10, marginHorizontal: 3 }} >
                                <Image source={require('../assets/Images/drawable-mdpi/icon.png')} />
                            </TouchableOpacity>
                            <Icon name='arrow-left' style={{ paddingLeft: 10, marginHorizontal: 3, fontSize: 22, color: "grey" }} />
                            <Input
                                placeholder={"Search for users"}
                                placeholderStyle={{ fontSize: 10 }}
                                placeholderTextColor="grey"
                                style={{ marginLeft: 15, fontSize: 15 }}
                                onChangeText={(e) => { this.setState({ searchUser: e }) }}
                                value={this.state.searchUser}
                            />
                        </Item>
                    </View>
                    <MapSeller style={{ zIndex: -1000 }} />
                    <TouchableOpacity style={styles.addMeal} onPress={() => Actions.AddMealPlan()}>
                        <Text style={{ color: 'white', fontSize: 26 }}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.giftBox}>
                        <Image source={require('../assets/HomeSeller/giftIcon-01.png')} />
                    </TouchableOpacity>

                </View>
            </Drawer>

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
export default connect(mapStateToProps, mapDispatchToProps)(HomeSeller);
const styles = StyleSheet.create({
    input: {
        marginTop: 20,
        backgroundColor: '#fff',
        // justifyContent: 'center',
        borderColor: '#fff',
        width: '80%',
        borderRadius: 18,
        zIndex: 1000,
        elevation: 5
    },
    addMeal: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        backgroundColor: '#3ACCE1',
        width: 50,
        height: 50,
        borderRadius: 7,
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    giftBox: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        position: 'absolute',
        bottom: 10,
        left: 10,
    }


});