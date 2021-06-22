import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Alert, StyleSheet, Dimensions, ImageBackground, View, TextInput, TouchableOpacity,Image } from 'react-native';
import bgImage from '../../images/loginImage.jpg';
import { Footer, FooterTab, Button, Text, Form, Item, Label } from 'native-base';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons'

const { width: WIDTH } = Dimensions.get('window')
console.disableYellowBox = true;

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null
    };
  }

  setEmail = (value) => {
    this.setState({ email: value });
  }

  setPassword = (value) => {
    this.setState({ password: value });
  }

  getLogin = () => {
    try {
      if (this.state.email && this.state.password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => {
            Actions.Personal();
          })
          .catch(error => {
            Alert.alert('Status', error.toString(error));
          });
      } else {
        Alert.alert('Status', 'Invalid Email & Password!');
      }
    } catch (error) {
      console.log(error.toString(error));
    }
  };

  showPass = () => {
    if (this.state.press == true) {
      this.setState({ showPass: true, press: false })
    } else {
      this.setState({ showPass: false, press: true })
    }
  }

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.titleContainer}>
          <Image source={require('../../images/busted.png')} style={{height: 150, width: 150, borderRadius: 100}}></Image>
          <Text style={styles.title}>BUSTED!</Text>
        </View>
        <View style={styles.inputContainer}>
          <Icon name={'ios-person'} size={28} color={'rgb(255,255,255)'} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'Email'}
            placeholderTextColor={'rgb(142, 142, 148)'}
            underlineColorAndroid='transparent'
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this.setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name={'ios-lock'} size={28} color={'rgb(255,255,255)'} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'Password'}
            placeholderTextColor={'rgb(142, 142, 148)'}
            underlineColorAndroid='transparent'
            secureTextEntry={this.state.showPass}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this.setPassword}
          />

        <TouchableOpacity style={styles.btnEye} onPress={this.showPass.bind(this)}>
          <Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'} size={28} color={'rgb(255,255,255)'} />
        </TouchableOpacity>

        </View>

        <TouchableOpacity style={styles.btnLogin} onPress={this.getLogin}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
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
  titleContainer: {
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 60
  },
  inputContainer: {
    marginTop: 10
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgb(0,0,0)',
    color: 'rgb(255,255,255)',
    marginHorizontal: 25,
    opacity: 0.8
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37
  },
  btnEye: {
    position: 'absolute',
    top: 8,
    right: 37
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: 'rgb(56, 50, 150)',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  }
})