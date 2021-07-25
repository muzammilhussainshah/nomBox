import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { StyleSheet, Text, TouchableOpacity, } from "react-native";
import { Button, Input, Item, View, } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { forgotPassword } from '../Store/Action/action'


class EmailVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };


    }

    resetLink = () => {
      console.log(this.state.email,"EMAILCHECK")
        if (this.state.email == '') {
            alert("Enter your email address")
        }
        else {
            if(this.props.email == this.state.email){
            this.props.forgotPassword(this.state.email)}
            else{
                alert("Email is not registered")
            }
        }
    }

    render() {
        console.log(this.props.email, "email")
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#2A2E43",
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: '3%'
            }}>

                <Item style={styles.input}>
                    <Input
                        placeholder={"Email"}
                        placeholderStyle={{ fontSize: 10 }}
                        placeholderTextColor="#b3b3b3"
                        keyboardType={'email-address'}
                        style={{ marginLeft: 15, fontSize: 15, color: "white" }}
                        onChangeText={(e) => { this.setState({ email: e }) }}
                        value={this.state.email}
                    />
                    <Icon name='email' style={{ marginRight: 20, fontSize: 22, color: "white" }} />
                </Item>


                <Button
                    block
                    onPress={this.resetLink}
                    style={{ width: "100%", backgroundColor: '#7155FE', height: 49, justifyContent: "center", borderRadius: 18 }}
                >
                    <Text style={{ color: "white" }}>Reset Link</Text>
                </Button>



            </View>
        );
    }
}
let mapStateToProps = state => {
    return {
        socialCredentials: state.root.socialCredentials

    };
};
function mapDispatchToProps(dispatch) {
    return ({
        forgotPassword: (email) => {
            dispatch(forgotPassword(email))
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);
const styles = StyleSheet.create({

    input: {
        marginTop: 20,
        backgroundColor: '#454F63',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#454F63',
        width: '100%',
        borderRadius: 18
    },

});