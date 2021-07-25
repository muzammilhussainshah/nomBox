import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import Avatar from 'react-native-badge-avatar';
import { getChatsAction } from '../Store/Action/action';
import { connect } from "react-redux";
import firebase from 'react-native-firebase'

const height = Dimensions.get('window').height;

// onContentSizeChange={(contentWidth, contentHeight) => this.setState({ listHeight: contentHeight })}
//                 onLayout={(e) => { const height = e.nativeEvent.layout.height; this.setState({ scrollViewHeight: height }) }}
//                 ref={(ref) => this.scrollView = ref}

class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            username: 'Jaikant Shikray',
            listHeight: 0,
            scrollViewHeight: 0,
        }
    }


    componentDidMount() {
        this.props.getChats(this.props.recieverId, this.props.orderKey, this.props.sessionKey)
    }

  

    render() {
        console.log(this.props.recieverId, this.props.orderKey, this.props.sessionKey, 'this.props.recieverId, this.props.orderKey, this.props.sessionKey')
        let messages = this.props.Chats != [] ? this.props.Chats : []
        console.log(messages, "MESSAGESSSSSSSSSSSSSSSSSSSSS")
        let userId = firebase.auth().currentUser.uid
        console.log(this.props.Chats, 'Chats')
        // let Chats = this.props.Chats !== [] ? this.props.Chats : []
        return (
            <ScrollView >
                {
                    messages !== null || messages !== undefined ?
                        messages.map((chat, index) => {
                            if (index == 0) {
                                this.props.checkSession(false)
                            }
                            return (
                                <View style={{ marginHorizontal: '3%', marginTop: 4 }} key={index} >
                                    <View style={chat.senderId == userId ? styles.avatarSenderStyle : styles.avatarRecieverStyle}>
                                        <Avatar
                                            size={55}
                                            // name={chef}
                                            source="../assets/Images/drawable-mdpi/image.png"
                                            placeholder={require("../assets/Images/drawable-mdpi/image.png")}
                                        />
                                    </View>
                                    <View style={chat.senderId == userId ? styles.inputDescriptionSender : styles.inputDescriptionReciever}>
                                        <Text style={{ color: '#fff', fontSize: 15, marginLeft: '12%', marginTop: '5%' }}>{chat.message}</Text>
                                    </View>
                                </View>
                            )
                        })
                        :
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#78849E' }}>
                                Start chatting...
                            </Text>
                        </View>
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    bubbleParent: {
        backgroundColor: 'red',
        height: 224,
        marginLeft: '1%',
        zIndex: -1000
    },
    avatarSenderStyle: {
        height: 32,
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: 'pink',
        position: 'absolute',
        top: -4,
        right: -4,
        zIndex: 1000,
        borderColor: 'white',
        borderWidth: 10
    },
    avatarRecieverStyle: {
        height: 32,
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: 'pink',
        position: 'absolute',
        top: -4,
        left: -4,
        zIndex: 1000,
        borderColor: 'white',
        borderWidth: 10
    },
    inputDescriptionSender: {
        marginLeft: 'auto',
        height: 63,
        width: '80%',
        backgroundColor: '#78849E',
        borderRadius: 12,
        marginVertical: 5,
        marginHorizontal: 5,
    },
    inputDescriptionReciever: {
        height: 63,
        width: '80%',
        backgroundColor: '#5773FF',
        borderRadius: 12,
        marginVertical: 5,
        marginHorizontal: 5,
    },
    avatar: {
        position: 'absolute',
        left: -3,
        top: -1,
        zIndex: 9000
    }
})
let mapStateToProps = state => {
    return {
        Chats: state.root.Chats

    };
};
function mapDispatchToProps(dispatch) {
    return ({
        getChats: (recieverId, orderKey, sessionKey) => {
            dispatch(getChatsAction(recieverId, orderKey, sessionKey))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);