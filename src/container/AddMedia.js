import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from "react-redux";
import firebase from 'react-native-firebase'
import { StyleSheet, View, Image, Text, ActivityIndicator, StatusBar, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import {
    Button
} from 'native-base';
import MultiImage from 'react-native-multi-image-selector';
import { mealAction } from '../Store/Action/action'

class AddMedia extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            loader: false
        }
    }

    imageArray = (uri) => {
        let images = this.state.images
        images.push(uri)
        this.setState({ images: images }, () => {
            console.log(this.state.images, 'im,ages')
            console.log(this.state.images.length, 'length')
        })
    }

    postImages = () => {
        this.setState({ loader: true })
        let images = this.state.images;
        let compareImages = []
        if (images.length !== 0) {
            images.forEach((image, i) => {
                let mime = 'image/jpg';
                const imageRef = firebase.storage().ref(`myMeals/` + image)
                imageRef.put(image, { contentType: mime })
                    .then((successCb) => {
                        console.log(successCb, "downloaded Url")
                        compareImages.push(successCb.downloadURL)
                        if (compareImages.length === images.length) {
                            console.log(compareImages.length, "compareImages.length", images.length, "images.length")
                            let obj = this.props.mealData
                            obj.downloadedURL = compareImages
                            this.props.meals(obj)
                        }
                        console.log(i, 'index')
                    })
                    .catch((failureCb) => {
                        alert(failureCb)
                        console.log(failureCb)
                    })
            })

        }

    }

    cameraOn = () => {
        console.log(this.state.images.length, "length")
        if (this.state.images.length == 3) {
            console.log(this.state.images.length, "length")
            alert("Upload limit reached")
        }
        else {
            console.log(this.state.images.length, "length")
            Actions.Camera({ func: this.imageArray })
        }
    }

    attachMedia = () => {
        let limit = 3 - this.state.images.length
        MultiImage.pickImage({
            showCamera: true,
            maxNum: limit,
            multiple: true
        }).then((imageArray) => {
            console.log(imageArray)
            let images = this.state.images
            images.push.apply(images, imageArray)
            console.log(images, "CONCAT DONE ???")
            this.setState({ images: images }, () => {
                console.log(this.state.images, 'attachMedia')
            })
        }).catch(e => {
            alert(e)
            console.log(e, "ERRORMULTIIMAGE")
        });

    }



    render() {
        return (
            <ScrollView style={{ backgroundColor: '#2A2E43' }}>

                <StatusBar
                    backgroundColor="#2A2E43"
                    barStyle="light-content"
                />
                {/* //header */}
                <View style={{
                    height: 100, backgroundColor: "#2A2E43", paddingLeft: 12,
                }}>
                    <View style={{ height: 30, justifyContent: "flex-end" }}>
                        <Icon name={'arrowleft'} size={20} color="#ffffff" />
                    </View>
                    <View style={{ height: 60, justifyContent: "center" }}>
                        <Text style={{ color: "#fff", fontSize: 36 }}>Add Media </Text>
                    </View>
                </View>



                <View style={{ alignItems: 'center' }}>

                    <TouchableOpacity
                        onPress={this.cameraOn}
                        style={styles.takePicture}>
                        <Icon name={'camerao'} size={70} color="#ffffff" />


                    </TouchableOpacity>


                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingHorizontal: 40 }}>
                        {/* {alert(JSON.stringify(this.state.imageArray))} */}
                        {(this.state.images.length !== 0 || undefined || null) ? (this.state.images.map((data, index) => {
                            console.log(data, "uri")
                            return (
                                <View key={index} style={{ paddingHorizontal: 7, paddingVertical: 7 }}>
                                    <Image source={{ uri: data }} style={{ width: 70, height: 70 }} />
                                </View>
                            )
                        })) : (null)}
                    </View>

                    <View style={styles.takePicture}>
                        <Text style={styles.text}>Add Images for your Meal, here</Text>
                        <Text style={styles.text}> is a quick guide on how to make good</Text>
                        <Text style={{ color: '#FFB900' }}> meal photos</Text>
                        <TouchableOpacity onPress={this.attachMedia} style={{ padding: 12 }}><Icon name={'upload'} size={20} color="#ffffff" /></TouchableOpacity>

                    </View>

                    {(this.state.loader == true) ?
                        (<Button
                            style={{ marginTop: '2%', alignSelf: 'center', width: '80%', height: 49, backgroundColor: '#3CC9E0', justifyContent: "center", borderRadius: 18 }}
                        >
                            <ActivityIndicator size={20} color="#fff" style={{ alignSelf: 'center' }} />
                        </Button>)
                        :
                        (<Button
                            onPress={this.postImages}
                            style={{ marginTop: '2%', alignSelf: 'center', width: '80%', height: 49, backgroundColor: '#3CC9E0', justifyContent: "center", borderRadius: 18 }}
                        >
                            <Text style={{ color: "white" }}>Post Meal</Text>
                        </Button>)
                    }
                </View>

            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    takePicture: {
        backgroundColor: '#727272', width: '78%', height: 160,
        borderRadius: 12, marginBottom: '5%', alignItems: 'center', justifyContent: 'center'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    text: { color: '#fff', textAlign: 'center' }
})
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
export default connect(mapStateToProps, mapDispatchToProps)(AddMedia);