import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { View } from 'native-base';
import EIcon from 'react-native-vector-icons/Entypo';

class Servings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servings: 1
        };
    }

    onChangeServings(val) {
        console.log(val, 'VALCHEXK')
        if (val == 'sub' && this.state.servings >= 1) {
            this.setState({ servings: this.state.servings - 1 }, () => {
                this.props.servingFunc(this.state.servings)
            })
        } else if (val == 'add') {
            this.setState({ servings: this.state.servings + 1 }, () => {
                this.props.servingFunc(this.state.servings)
            })
        }
    }
    render() {
        return (
            <View>
                <Text style={{ fontSize: 21, color: 'white' }}>Servings</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={this.onChangeServings.bind(this, 'sub')}><EIcon name={'circle-with-minus'} size={20} color="#CBCBCB" /></TouchableOpacity><Text style={{ fontSize: 21, color: 'white' }}>{this.state.servings}</Text><TouchableOpacity onPress={this.onChangeServings.bind(this, 'add')}><EIcon name={'circle-with-plus'} size={20} color="#FF9057" /></TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Servings;
