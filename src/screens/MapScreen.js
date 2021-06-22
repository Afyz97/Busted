import React, { Component } from 'react';
import { StyleSheet, View, Alert, Platform,Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
//import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { Actions } from 'react-native-router-flux';

console.disableYellowBox = true;

export default class Playground extends Component {
  static navigationOptions = {
    title: 'Location',
  };

  state = {

  } 

  componentDidMount() {
    this.locateCurrentPosition();
  }
  /*
  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iPhone: ' + response);

      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Android: ' + response);

      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    }
  }*/

  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(JSON.stringify(position));
        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035
        }
        this.setState({ initialPosition });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    )

    Geocoder.init("AIzaSyDU_bfJHlYkbiuwf_xOmkDxAgylIp5Hly0");
    
    Geocoder.from(this.state.initialPosition)
        .then(json => {
            var addressComponent = json.results[0].address_components[0];
            
            this.setState({ addressComponent });
        })
        .catch(error => console.warn(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          style={styles.map}
          initialRegion={this.state.initialPosition}>
        </MapView>
        <Button style={styles.button}
          title='Select Location'
          onPress={() => {Actions.NewScreen({location: this.state.initialPosition})}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill
  },
  map: {
    height: '94%'
  },
  button: {
    flex: 1,
    flexDirection: 'row'
  }
});