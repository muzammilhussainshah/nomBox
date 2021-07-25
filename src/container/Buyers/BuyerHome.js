import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';;
import { Text, Image, Dimensions, StyleSheet, TouchableOpacity, StatusBar, PermissionsAndroid } from "react-native";
import { Input, Item, View, } from 'native-base';
import Map from '../../Component/Map'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Drawer from 'react-native-drawer';
import DrawerComponent from '../../Component/DrawerComponent';
import NearbyMap from './NearbyMap';
import Buyer from './buyer';
import SwitchSelector from 'react-native-switch-selector';
import SystemSetting from 'react-native-system-setting'


const drawerStyles = {
    
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    main: { paddingLeft: 3 },
}

class BuyerHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleScreens: true,
            latitude: null,
            longitude: null,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        };
        this.imageMap = require('../../assets/Images/drawable-hdpi/map.png')
        this.imageGrid = require('../../assets/Images/drawable-hdpi/menu.png')
    }



    closeControlPanel = () => {
        this._drawer.close()
    };

    openControlPanel = () => {
        this._drawer.open()
    };

    render() {
        console.log(this.state.toggleScreens, "TOGGLESCREEN")
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
                <View style={{ flex: 1 }}>
                    <StatusBar
                        backgroundColor="#fff"
                        barStyle="dark-content"
                    />
                    {
                        (this.state.toggleScreens === true) ? (

                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={this.openControlPanel} style={{ position: 'absolute', zIndex: 1000, marginTop: '6%', left: '6%' }} >
                                    <Image source={require('../../assets/Images/drawable-mdpi/Ico-menu-orange.png')} />
                                </TouchableOpacity>

                                <NearbyMap />
                            </View>
                        ) : (
                                <View style={{ flex: 1 }}>
                                    <View style={{ height: 112, flexDirection: "row", backgroundColor: '#444F63', zIndex: 1000 }}>
                                        <View style={{
                                            flex: 2,
                                            padding: 12
                                        }}>
                                            <View style={{ flex: 2, marginTop: '6%', marginLeft: '3%' }}>
                                                <Text style={{ color: "#fff", fontSize: 41 }}>Nearby </Text>
                                                <Text style={{ color: "#949AA6", fontSize: 16 }}>127 meals available </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={this.openControlPanel} style={{ position: 'absolute', zIndex: 1000, top: '3%', left: '6%' }} >
                                        <Image source={require('../../assets/Images/drawable-mdpi/Ico-menu-light.png')} />
                                    </TouchableOpacity>
                                    <Buyer />
                                </View>
                            )}
                    <View style={{justifyContent: "center", position: 'absolute', zIndex: 1000, right: '5%', top: '8%' }}>
                        <SwitchSelector
                            initial={0}
                            style={{ width: 80, height: 40 }}
                            onPress={value => this.setState({ toggleScreens: value }, () => console.log(this.state.toggleScreens, 'toggle'))}
                            textColor={'#fff'} //'#7a44cf'
                            imageStyle={{ height: 15, width: 15 }}
                            // selectedColor={colors.white}
                            buttonColor={'#78849E'}
                            // borderColor={colors.purple}
                            hasPadding
                            options={[
                                { label: '', value: true, imageIcon: this.imageMap },//images.masculino = require('./path_to/assets/img/masculino.png')
                                { label: '', value: false, imageIcon: this.imageGrid }
                            ]} />
                    </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(BuyerHome);
const styles = StyleSheet.create({



});