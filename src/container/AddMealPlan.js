import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import {
    Text,
    StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator
} from "react-native";
import { Button, Input, Picker, Item, View, Icon } from 'native-base';
import AIcon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ToggleSwitch from 'toggle-switch-react-native'
import { mealAction } from '../Store/Action/action'
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GoogleAddress from '../Component/googleAddress';

const meals = ['Lunch', 'Breakfast', 'Dinner']
const servings = ['1', '2', '3', '4']

class AddMealPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            latitude: null,
            longitude: null,
            address: null,
            description: '',
            serving: '1',
            mealTime: 'Lunch',
            mealDay: '',
            locationServices: true,
            loader: false,
        };
    }
    onValueServings(value) {
        this.setState({
            serving: value
        });
    }
    onValueMealTime(value) {
        this.setState({
            mealTime: value
        });
    }

    submitMeal = () => {
        let check = this.state
        if (check.title == '' || check.address == '' || check.description == '' || check.serving == '' || check.mealTime == '' || check.mealDay == '') {
            alert("Please Fill all the fields")
        } else {

            let mealDetail = {
                title: this.state.title,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                address: this.state.address,
                description: this.state.description,
                serving: this.state.serving,
                mealTime: this.state.mealTime,
                mealDay: this.state.mealDay,
                locationServices: this.state.locationServices
            }
            console.log(mealDetail, "MEAL Details")
            Actions.AddMedia({ mealData: mealDetail })
            // this.props.meals(mealDetail)
            this.setState({
                title: '',
                latitude: null,
                longitude: null,
                address: null,
                description: '',
                serving: '',
                mealTime: '',
                mealDay: '',
                locationServices: true,
                // loader: true
            })
        }
    }

    getSearchLoc = (loc, address) => {
        console.log(loc, "loc", address, 'address');
        this.setState({
            latitude: loc.lat,
            longitude: loc.lng,
            address: address
        })
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{ backgroundColor: "#fff" }}>
                    <TouchableOpacity style={{ height: 70, justifyContent: "center" }} onPress={() => Actions.pop()}>
                        <AIcon name={'arrowleft'} size={20} color="#000" />
                    </TouchableOpacity>

                </View>
                <View>
                    <Text style={styles.label}>Title</Text>
                    <Item style={styles.input} >
                        <Input
                            placeholder={"Your Meal"}
                            placeholderStyle={{ fontSize: 40 }}
                            placeholderTextColor="#999999"
                            style={{ height: 60, fontSize: 40 }}
                            onChangeText={(e) => { this.setState({ title: e }) }}
                            value={this.state.title}
                        />
                    </Item>
                    <View>
                        <Text style={styles.label}>Description</Text>
                        <Item style={styles.inputDescription} >
                            <Input
                                multiline={true}
                                numberOfLines={5}
                                placeholder={"Description"}
                                placeholderStyle={{ marginLeft: 3 }}
                                placeholderTextColor="#999999"
                                // style={{ height: 120 }}
                                onChangeText={(e) => { this.setState({ description: e }) }}
                                value={this.state.description}
                            />
                        </Item>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.label}>Servings</Text>
                            <Item Picker style={styles.dropdown} >
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    style={{ width: '40%' }}
                                    placeholder="Select your SIM"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.serving}
                                    onValueChange={this.onValueServings.bind(this)}
                                >
                                    {
                                        servings.map((val, index) => {
                                            return (
                                                <Picker.Item label={val} value={val} key={index} />
                                            )
                                        })
                                    }
                                </Picker>
                            </Item>
                        </View>

                        <View>
                            <Text style={styles.label}>Meal Time</Text>
                            <Item Picker style={styles.dropdown} >
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    style={{ width: '40%' }}
                                    placeholder="Select your SIM"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.mealTime}
                                    onValueChange={this.onValueMealTime.bind(this)}
                                >
                                    {
                                        meals.map((val, index) => {
                                            return (
                                                <Picker.Item label={val} value={val} key={index} />
                                            )
                                        })
                                    }
                                </Picker>
                            </Item>
                        </View>
                    </View>

                    <View style={{
                        marginVertical: '3%', borderRadius: 18,
                        zIndex: 1000, borderColor: '#fff',
                        width: '100%',
                        // elevation: 2
                    }}>
                        {/* <Text style={styles.label}>Address</Text> */}
                        {/* <Item style={styles.address}> */}
                        {/* <MIcon name='plus' style={{ paddingLeft: 10, marginHorizontal: 3, fontSize: 26, color: "blue" }} /> */}
                        <GoogleAddress
                            ref={(ref) => { this.SearchBox = ref }}
                            style={{
                            }}
                            getSearchLoc={this.getSearchLoc} />
                        {/* <Input
                                placeholder={"Add Address"}
                                placeholderStyle={{ fontSize: 10 }}
                                placeholderTextColor="grey"
                                style={{ marginLeft: 15, fontSize: 15 }}
                                onChangeText={(e) => { this.setState({ address: e }) }}
                                value={this.state.address}
                            /> */}
                        {/* </Item>  */}
                    </View>

                    <View>
                        <Text style={styles.label}>Calender</Text>
                        <Calendar

                            current={this.state.current}
                            theme={{
                                calendarBackground: '#242C57',
                                backgroundColor: '#ffffff',
                                textSectionTitleColor: '#fff',
                                monthTextColor: '#fff',
                                textMonthFontSize: 25,
                                selectedDotColor: 'blue',
                                dotColor: 'red',
                                textDisabledColor: '#78849E',
                                dayTextColor: '#fff',
                                textDayFontSize: 12,
                                selectedDayBackgroundColor: '#665EFF',
                                selectedDayTextColor: 'red',
                                arrowColor: 'white',
                                'stylesheet.calendar.header': {
                                    week: {
                                        marginTop: 5,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        // backgroundColor: '#665EFF',
                                        borderRadius: 10

                                    },
                                    header: {
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        backgroundColor: '#665EFF',
                                        borderRadius: 10,
                                        // paddingHorizontal: '4%'
                                    }
                                }
                            }}
                            style={{
                                borderRadius: 10,
                                // width:'90%'
                            }}


                            onDayPress={(day) => {
                                console.log(day)
                                this.setState({ mealDay: day.timestamp, current: day.dateString })
                                console.log('selected daylong', day.timestamp)
                            }}
                            onDayLongPress={(day) => {
                                console.log(day)
                                this.setState({ mealDay: day.timestamp, current: day.dateString })
                                console.log('selected daylong', day.timestamp)
                            }}
                        />

                    </View>
                    <View style={{ alignItems: 'center', paddingVertical: "3%" }}>
                        <Text style={styles.calenderDesc}>
                            Select the days where you want to
                        </Text>
                        <Text style={styles.calenderDesc}>
                            list your Meals
                        </Text>
                    </View>

                    <Item style={styles.locationServices}>
                        <View>
                            <Text>Location Services</Text>
                        </View>
                        <View>
                            <ToggleSwitch
                                isOn={this.state.locationServices}
                                onColor='#4BD964'
                                offColor='red'
                                // label='Empoyment Status'
                                labelStyle={{ color: 'white', fontWeight: '500' }}
                                size='medium'
                                onToggle={(isOn) => {
                                    this.setState({ locationServices: isOn })
                                    console.log('changed to : ', isOn)
                                }}
                            />
                        </View>
                    </Item>
                    <Item style={{ marginVertical: 10 }}>
                        <Button
                            block
                            onPress={this.submitMeal}
                            style={{ width: "99%", backgroundColor: '#7155FE', height: 49, justifyContent: "center", borderRadius: 10, marginVertical: 8 }}
                        >{this.state.loader ?
                            <ActivityIndicator style={{ top: 20, marginBottom: 20 }} />
                            :
                            <Text style={{ color: "white" }}>MEAL PLANNED</Text>}
                        </Button>
                    </Item>

                </View>
            </ScrollView>

        );
    }
}
let mapStateToProps = state => {
    return {


    };
};
function mapDispatchToProps(dispatch) {
    return ({
        meals: (details) => {
            dispatch(mealAction(details))
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(AddMealPlan);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: '6%'
    },
    input: {
        height: 60,
        justifyContent: 'center',
        borderColor: '#fff',
        width: '100%'
    },
    label: {
        fontSize: 18,
        marginVertical: 7,
        color: '#999999'
    },
    inputDescription: {
        width:"98%",
        // marginTop: 3,
        backgroundColor: '#fff',
        // justifyContent: 'center',
        borderColor: '#fff',
        borderRadius: 18,
        zIndex: 1000,
        elevation: 5
    },
    dropdown: {
        marginTop: 3,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderColor: '#fff',
        width: '78%',
        borderRadius: 18,
        zIndex: 1000,
        elevation: 5
    },
    address: {
        marginTop: 3,
        // backgroundColor: '#fff',
        justifyContent: 'center',

        alignSelf: 'center',

    },
    locationServices: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        backgroundColor: '#fff',
        borderColor: '#fff',
        width: '98%',
        borderRadius: 18,
        zIndex: 1000,
        elevation: 5,
        height: 50,
        paddingHorizontal: '7%'
    },
    calenderDesc: {
        fontSize: 14,
        color: '#78849E'
    }
});