import React, { Component } from 'react';
import { Keyboard } from 'react-native';
var { GooglePlacesAutocomplete } = require('react-native-google-places-autocomplete');
class GoogleAddress extends React.Component {
    state = {
        address: 'Add Location'
    }
    render() {
        return (
            <GooglePlacesAutocomplete
                ref={(ref) => {
                    this.GooglePlacesRef = ref;
                }}
                placeholder={this.state.address}
                minLength={2} // minimum length of text to search
                autoFocus={false}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    console.log(data, "DATA");
                    console.log(details.geometry, "DETAILES");
                    this.props.getSearchLoc(details.geometry.location, this.GooglePlacesRef.getAddressText())
                    let address = this.GooglePlacesRef.getAddressText()
                    this.setState({ address: address }, () => this.GooglePlacesRef.setAddressText(''))
                    Keyboard.dismiss()
                }}
                getDefaultValue={() => {
                    return ''; // text input default value
                }}
                query={{
                    key: 'AIzaSyBlx-ZOQsRgR_cfZ7V7vjanud3DhTQVyTE',
                    language: 'en', // language of the results
                }}
                // styles={{
                //     textInputContainer: {
                //         width: '90%',
                //         alignSelf: 'center',
                //         borderBottomColor: '#2A2E43'
                //     },
                //     description: {
                //         fontWeight: 'bold',
                //         backgroundColor: 'white',
                //         fontSize: 15
                //     },
                //     predefinedPlacesDescription: {
                //         color: '#1faadb',
                //         backgroundColor: 'white'
                //     },
                //     backgroundColor: 'white'
                // }}
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    types: 'food',
                }}
                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

            />
        );
    }
}
export default GoogleAddress