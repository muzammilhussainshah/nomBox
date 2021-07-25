import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/AntDesign';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import ActionTypes from '../Store/Constant/constant'

class Header extends Component {

    render() {
        return (
            // this.props.screen == 'ChatList' ?
            <View >
                <StatusBar
                    backgroundColor="#F7F7FA"
                    barStyle="dark-content"
                />
                {/* //header */}
                <View style={styles.headerView}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: '3%' }}>
                        <TouchableOpacity onPress={
                            () => {
                                console.log(Actions, 'ActionsChatList')
                                if (this.props.screen == 'ChatScreen') {
                                    this.props.clearMessages()
                                } else if (this.props.screen == 'ChatList') {
                                    this.props.clearSession()
                                }
                                Actions.pop()
                            }}
                            style={styles.button}>
                            <Icon name={'arrowleft'} size={20} color="#454F63" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Actions.pop()} style={styles.button}>
                            <Icon name={'search1'} size={20} color="#454F63" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>{this.props.chatName}</Text>
                    </View>

                </View>

            </View >
            // :
            // <View >
            //     <StatusBar
            //         backgroundColor="#F7F7FA"
            //         barStyle="dark-content"
            //     />
            //     {/* //header */}
            //     <View style={styles.headerView}>
            //         <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: '3%' }}>
            //             <TouchableOpacity onPress={() => Actions.pop()} style={styles.button}>
            //                 <Icon name={'arrowleft'} size={20} color="#454F63" />
            //             </TouchableOpacity>
            //             <TouchableOpacity onPress={() => Actions.pop()} style={styles.button}>
            //                 <Icon name={'search1'} size={20} color="#454F63" />
            //             </TouchableOpacity>
            //         </View>
            //         <View style={styles.title}>
            //             <Text style={styles.titleText}>Jenny </Text>
            //         </View>

            //     </View>

            // </View >

        )
    }
}

const styles = StyleSheet.create({
    headerView: {
        height: 110, backgroundColor: "#F7F7FA", paddingLeft: 12,
        // borderBottomColor: "#1493E6", borderBottomWidth: 1
    },
    button: { height: 30, justifyContent: "flex-end" },
    title: { height: 60, justifyContent: "space-between", flexDirection: 'row', paddingHorizontal: '3%' },
    titleText: { color: "#454F63", fontSize: 36, fontWeight: 'bold' }
})

function mapDispatchToProps(dispatch) {
    return ({
        clearMessages: () => {
            dispatch({ type: ActionTypes.CLEARCHAT })
        },
        clearSession: () => {
            dispatch({ type: ActionTypes.CLEARSESSIONS })
        }
    })
}
export default connect(null, mapDispatchToProps)(Header);