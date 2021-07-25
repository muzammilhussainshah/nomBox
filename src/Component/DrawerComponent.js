import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Image, Text, ImageBackground, StatusBar, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from "react-redux";
import { checkSessionAction } from '../Store/Action/action'
import ActionTypes from "../Store/Constant/constant";

class DrawerComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            seacrh: "",
            noUser: null
        }
    }

    onLogout = () => {
        this.props.clearState()
        firebase.auth().signOut()
    }

    chatList = () => {
        this.props.checkSession(null)
        Actions.ChatList()
    }

    componentDidMount() {
        let user = firebase.auth().currentUser
        if (user == null || user == undefined) {
            console.log('login')
            this.setState({ noUser: true })
        } else {
            this.setState({ noUser: false })
            console.log('logout')
        }
    }

    render() {
        let name = "James Bond"
        let handle = "@JamesBond"
        return (
            this.state.noUser == true ?
                <View style={styles.drawerContainer}>
                    <View>
                        <Image source={require('../assets/Images/drawable-mdpi/mask.png')} />
                        <TouchableOpacity onPress={this.props.closeDrawer} style={{ position: 'absolute', right: 7, top: 7 }}>
                            <Icon name='close-circle' style={{ fontSize: 22, color: "white" }} />
                        </TouchableOpacity>
                        <View style={{ position: 'absolute', top: '41%', left: '17%' }}>
                            <Text style={{ fontSize: 41, color: '#fff',fontWeight:'bold' }}>NOMBOX</Text>
                        </View>


                    </View>
                    <View style={{ paddingHorizontal: '3%' }}>
                        <TouchableOpacity style={styles.drawerList}>
                            <Icon name='home-outline' style={styles.drawerListIcon} />
                            <Text style={styles.drawerListText}>Home</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.drawerList} onPress={() => Actions.signIn()}>
                            <Icon name='login' style={styles.drawerListIcon} />
                            <Text style={styles.drawerListText}>Log In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drawerList}>
                            <Icon name='account-outline' style={styles.drawerListIcon} />
                            <Text style={styles.drawerListText}>Support & FAQs</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drawerList}>
                            <Text style={styles.drawerLastText}>About Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drawerList}>
                            <Text style={styles.drawerLastText}>Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :
                <View style={styles.drawerContainer}>
                    <View>
                        <Image source={require('../assets/Images/drawable-mdpi/mask.png')} />
                        <TouchableOpacity onPress={this.props.closeDrawer} style={{ position: 'absolute', right: 7, top: 7 }}>
                            <Icon name='close-circle' style={{ fontSize: 22, color: "white" }} />
                        </TouchableOpacity>
                        <View style={{ position: 'absolute', top: '20%', left: '4%' }}>
                            <Image source={require('../assets/Images/drawable-mdpi/user_photo.png')} style={{ marginBottom: 4 }} />
                            <Text style={{ fontSize: 24, color: '#fff', marginBottom: 4 }}>{name}</Text>
                            <Text style={{ fontSize: 14, color: '#fff' }}>{handle}</Text>
                        </View>


                    </View>
                    <View style={{ paddingHorizontal: '3%' }}>
                        <TouchableOpacity style={styles.drawerList}>
                            <Icon name='home-outline' style={styles.drawerListIcon} />
                            <Text style={styles.drawerListText}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drawerList}>
                            <Icon name='account-convert' style={styles.drawerListIcon} />
                            <Text style={styles.drawerListText}>User Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drawerList} onPress={() => Actions.MyPlans()}>
                            <Icon name='calendar-multiselect' style={styles.drawerListIcon} />
                            <Text style={styles.drawerListText}>My Meals</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drawerList} onPress={this.chatList}>
                            <Icon name='wechat' style={styles.drawerListIcon} />
                            <Text style={styles.drawerListText}>Messages</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drawerList}>
                            <Icon name='credit-card' style={styles.drawerListIcon} />
                            <Text style={styles.drawerListText}>Payments</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drawerList}>
                            <Icon name='account-outline' style={styles.drawerListIcon} />
                            <Text style={styles.drawerListText}>Support & FAQs</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drawerList}>
                            <Text style={styles.drawerLastText}>About Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drawerList}>
                            <Text style={styles.drawerLastText}>Privacy Policy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drawerList} onPress={this.onLogout}>
                            <Text style={[styles.drawerLastText, { color: 'red' }]}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>


        )
    }
}

const styles = StyleSheet.create({
    drawerContainer: {
        backgroundColor: '#2A2E43',
        flex: 1,
    },
    drawerList: { flexDirection: 'row', alignItems: 'center', padding: 9 },
    drawerListIcon: { fontSize: 23, color: "white", marginRight: 12 },
    drawerListText: { fontSize: 15, color: '#fff' },
    drawerLastText: { marginLeft: 3, fontSize: 15, color: 'grey' }
})

let mapStateToProps = state => {
    return {


    };
};
function mapDispatchToProps(dispatch) {
    return ({
        clearState: () => {
            dispatch({ type: ActionTypes.CLEARSTATE })
        },
        checkSession: (orderKey) => {
            dispatch(checkSessionAction(orderKey))
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(DrawerComponent);