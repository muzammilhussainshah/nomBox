import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux'

export default class Camera extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loader: false
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    (this.state.loader == true) ?
                        (<ActivityIndicator size={60} color="#fff" style={{ top: '50%', alignSelf:'center', zIndex: 1000, position: 'absolute' }} />
                        ) : null}
                <RNCamera
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    // flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                >
                    {({ camera, status }) => {
                        // if (status !== 'READY') return <PendingView />;
                        return (
                            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                                    <Icon name={'camerao'} size={30} color="#000" />

                                </TouchableOpacity>
                            </View>
                        );
                    }}
                </RNCamera>
            </View>
        );
    }

    takePicture = async function (camera) {
        this.setState({ loader: true })
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        //  eslint-disable-next-line
        console.log(data.uri);
        this.props.func(data.uri)
        Actions.pop()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});