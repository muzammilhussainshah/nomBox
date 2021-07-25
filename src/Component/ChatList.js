import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/AntDesign';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import { Button, Input, Picker, Item } from 'native-base';
import FIcon from 'react-native-vector-icons/FontAwesome'
import { connect } from "react-redux";
import Header from '../Component/Header';
import firebase from 'react-native-firebase'
import ActionTypes from '../Store/Constant/constant';

class ChatList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // rcvrId: null
        }
    }

    componentDidMount() {
        this.props.clearChat()
    }



    render() {
        let title = "TestUser"
        let sessionArr = this.props.Sessions == [] || this.props.Sessions == null ? [] : this.props.Sessions
        console.log(this.props.Sessions, "this.props.Sessions")
        console.log(sessionArr, "sessionArr")

        return (
            <View>
                <Header screen={'ChatList'} chatName={'Messages'} />
                {
                    sessionArr.map((val, index) => {
                        console.log(val, "VAL")
                        return (
                            < TouchableOpacity key={index} onPress={() => Actions.ChatScreen({ chatKeys: val })} style={styles.list}>
                                <View>
                                    <Image source={require("../assets/Images/drawable-mdpi/user_photo.png")} resizeMode="contain" style={{ height: 60, width: 60 }} />
                                </View>
                                <View>
                                    <Text style={{ marginLeft: '4%', marginBottom: '12%', color: '#454F63', fontWeight: 'bold', alignSelf: 'center', fontSize: 18 }}>{title}</Text>
                                </View>
                                <View>
                                    <Text style={{ marginLeft: '4%', marginBottom: '12%', color: '#454F63', fontWeight: 'bold', alignSelf: 'center', fontSize: 18 }}>{val.status}</Text>
                                </View>

                                <View style={{ position: 'absolute', right: '9%', top: '50%', backgroundColor: '#FF4F9A', borderRadius: 50, height: 12, width: 12 }}>
                                </View>
                            </TouchableOpacity>)
                    })
                }
            </View>

        )
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: '4%',
        paddingVertical: '4%',
        borderBottomWidth: 0.3,
        borderBottomColor: '#000'

    }
})



let mapStateToProps = state => {
    return {
        Sessions: state.root.Sessions,
        allSessions: state.root.allSessions

    };
};
function mapDispatchToProps(dispatch) {
    return ({
        sentMessage: (message, recieverId) => {
            dispatch(sentMessageAction(message, recieverId))
        },
        clearChat: () => {
            dispatch(dispatch({ type: ActionTypes.CLEARCHAT }))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
