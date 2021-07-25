import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/FontAwesome'
import { Platform, StyleSheet, Text, View, ScrollView, Image, Switch, TextInput, Picker , TouchableOpacity } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
export default class Payment extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#fff' }} >

                <View style={{
                    height: 100, backgroundColor: "#fff", paddingLeft: 12,
                    // borderBottomColor: "#1493E6", borderBottomWidth: 1
                }}>
                    <View style={{ height: 30, justifyContent: "flex-end" }}>
                        <Icon name={'arrowleft'} size={20} color="#7E7F84" />
                    </View>
                    <View style={{ height: 60, justifyContent: "center" }}>
                        <Text style={{ color: "#7E7F84", fontSize: 36 }}>Payment </Text>
                    </View>
                </View>
                <View style={{
                    height: 163, backgroundColor: '#272F42', marginHorizontal: "4%",
                    borderRadius: 5
                }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1.4, }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={styles.inputStyle}>
                                    <Text style={styles.inputText}> Bilal </Text>
                                    <TextInput
                                        placeholderTextColor={"#fff"}
                                        placeholder={'1223 32 323 2'}
                                        style={{ color: "#fff", height: 40 }}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={styles.inputStyle}>
                                    <Text style={styles.inputText}> Bilal </Text>
                                    <TextInput
                                        placeholderTextColor={"#fff"}
                                        placeholder={'1223 32 323 2'}
                                        style={{ color: "#fff", height: 40 }} />
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={styles.inputStyle}>
                                    <Text style={styles.inputText}> Bilal </Text>
                                    <TextInput
                                        placeholderTextColor={"#fff"}
                                        placeholder={'1223 32 323 2'}
                                        style={{ color: "#fff", height: 40 }} />
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={styles.inputStyle}>
                                    <Text style={styles.inputText}> Bilal </Text>
                                    <TextInput
                                        placeholderTextColor={"#fff"}
                                        placeholder={'1223 32 323 2'}
                                        style={{ color: "#fff", height: 40 }} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ height: 70, justifyContent: "center", alignItems: "center" }}>
                    <TextInput
                        underlineColorAndroid='#fff'
                        placeholderTextColor={"#DFE2E1"}
                        placeholder={'Canada'}
                        style={{
                            color: "#efefef", height: 42, width: '85%', height: 45, padding: 4, paddingLeft: 10,
                            borderColor: "#DFE2E1", borderWidth: 1, borderRadius: 4, elevation: 2
                        }} />
                </View>
                <View style={{ height: 70, justifyContent: "center", alignItems: "center" }}>
                    <View style={{
                        height: 45, width: '85%', padding: 4, paddingLeft: 10,
                        justifyContent: "center",
                        borderColor: "#efefef", borderWidth: 1, borderRadius: 4, elevation: 2
                    }}>
                        <Picker
                            selectedValue={this.state.language}
                            style={{
                                height: 42, width: '100%', padding: 4, paddingLeft: 10,
                                borderColor: "#efefef", borderWidth: 1, borderRadius: 4, elevation: 2,
                            }}
                            onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                    </View>
                </View>
                <View style={{ height: 90, justifyContent: "center", alignItems: "center" }}>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        underlineColorAndroid='#fff'
                        placeholderTextColor={"#DFE2E1"}
                        placeholder={'Canada'}
                        style={{
                            color: "#DFE2E1", width: '85%', padding: 4, paddingLeft: 10,
                            borderColor: "#DFE2E1", borderWidth: 1, borderRadius: 4, elevation: 2
                        }} />
                </View>
                <View style={{
                    flexDirection: "row", height: 70, marginHorizontal : "5%",
                    alignItems: "center", justifyContent: "center"
                }}>
                    <TouchableOpacity style={{
                        flex: 1, width: "100%",
                        height: 45, borderRadius: 8, borderWidth: 1,
                        borderColor: '#dcdddc', backgroundColor: "#dcdddc",
                        justifyContent: "center", alignItems: "center", marginRight: 12,
                        marginLeft: 12
                    }}>
                        <Text style={{
                            color: '#fff', fontSize: 15,
                            textAlign: "center",
                        }}> CANCEL </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flex: 1, width: "100%",
                        height: 45, borderRadius: 8, borderWidth: 1, marginLeft: 12,
                        borderColor: '#3ACCE1', backgroundColor: "#3ACCE1",
                        justifyContent: "center", alignItems: "center", marginRight: 12,
                    }}  >
                        <Text style={{
                            color: '#fff', fontSize: 14,
                            textAlign: "center",
                        }}> APPLY </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView >
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
    inputStyle: {
        height: 65, borderColor: '#000', borderWidth: 1,
        width: '90%', borderRadius: 5, backgroundColor: '#414F5E',
    },
    inputText: {
        fontSize: 15, color: '#fff', height: 20, margin: 2
    }
});