import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Alert, TouchableOpacity, Dimensions, StyleSheet, ImageBackground } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, Form, Item, Label, Input, Picker } from 'native-base';
import { addStudent } from '../services/DataService';
import ImagePicker from 'react-native-image-picker';

const { width: WIDTH } = Dimensions.get('window')
console.disableYellowBox = true;

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class NewScreen extends Component {
  constructor() {
    super();
    this.state = {
      camera: "",
      location: "",
      summonid: "",
      offence: ""
    };
  }

  getImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        this.setState({
          camera: source,
        });
      }
    });
  }

  componentDidMount(){
    this.setLocation();
  }
  
  setSummonID = (value) => {
    this.setState({ summonid: value });
  }
  
  setLocation = () => {
    let location = this.props.location;
    this.setState({ location });
  }

  selectOffence = (value) => {
    this.setState({ offence: value });
  }

  saveData = () => {
    this.state.location = this.props.location;
    if (this.state.camera && this.state.location && this.state.summonid && this.state.offence) {
      if (isNaN(this.state.summonid)) {
        Alert.alert('Status', 'Invalid Matric No!');
      }
      else {
        addStudent(this.state.camera, this.state.location, this.state.summonid, this.state.offence);
      }
    } else {
      Alert.alert('Status', 'Empty Field(s)!');
    }
  }

  render() {
    return (
      <ImageBackground source={require('../../images/white.jpg')} style={styles.backgroundContainer}>
        <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }}>Summon Details</Text>

          <Item fixedLabel last>
            <Label>   Summon ID</Label>
            <Input onChangeText={this.setSummonID} />
          </Item>
          <Item>
            <Label>   Camera</Label>
            <TouchableOpacity style={{ alignItems: 'center', backgroundColor: '#DDDDDD', padding: 10, }} onPress={this.getImage}>
              <Text>Get Image</Text>
            </TouchableOpacity>
          </Item>
          <Item>
            <Label>   Location</Label>
            <TouchableOpacity style={{ alignItems: 'center', backgroundColor: '#DDDDDD', padding: 10, }} onPress={() => { Actions.MapScreen(); }}>
              <Text>   Get location</Text>
            </TouchableOpacity>
          </Item>
          <Item fixedLabel picker last>
            <Label>   Offence</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              placeholder="Select Offence"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.offence}
              onValueChange={this.selectOffence}
              Title="Offence"
            >
              <Picker.Item label="Not Wearing Helmet" value="1" />
              <Picker.Item label="Unauthorized Parking" value="2" />
              <Picker.Item label="No Sticker" value="3" />
              <Picker.Item label="Exceed Speed Limit" value="4" />
            </Picker>
          </Item>


        <Button block last style={styles.btnSave} onPress={this.saveData}>
          <Text style={{ fontWeight: "bold" }}>Save</Text>
        </Button>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center'
},
  btnSave: {
    width: WIDTH - 80,
    height: 45,
    borderRadius: 25,
    backgroundColor: 'rgb(242, 12, 12)',
    justifyContent: 'center',
    marginTop: 50,
    left: 40
  }

})