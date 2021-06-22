import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements'
import { Footer, FooterTab, Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as firebase from 'firebase';
import avatarImg from '../../images/m3.jpg'
import { Actions } from 'react-native-router-flux';
import { db } from '../config/db';
import SummonList from '../components/SummonList';

let studentsRef = db.ref('/summon');
const { width: WIDTH } = Dimensions.get('window')
console.disableYellowBox = true;

export default class PersonalScreen extends Component {

    constructor() {
        super();
        this.state = {
            students: []
        }
    }

    componentDidMount() {
        studentsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            if (data) {
                let firebaseData = Object.values(data);
                this.setState({ students: firebaseData });
                console.log(this.state.students);
            }
        });
    }

    goToNewScreen = () => {
        Actions.NewScreen();
    }

    goToLoginScreen = () => {
        firebase
            .auth()
            .signOut()
            .then(function () {
                Actions.LoginScreen();
            })
            .catch(function (error) {
                Alert.alert('Status', error.toString(error));
            });
    }


    render() {

        return (

            <ImageBackground source={require('../../images/hexagon.jpg')} style={styles.backgroundContainer}>
                <View style={styles.avatarContainer}>
                    <TouchableOpacity onPress={this.goToLoginScreen} style={{ left: 170 }}>
                        <Icon name="sign-out" size={30} color={'rgb(255,255,255)'} />
                    </TouchableOpacity>

                    <Avatar rounded source={avatarImg} size={150} />
                    <Text style={styles.avatarTxt}>Ziz Faris</Text>
                </View>
                <View>
                    <Text style={styles.profileTxt}>Occupation: Leftenan</Text>
                    <Text style={styles.profileTxt}>Phone No: 999</Text>
                    <Text style={styles.profileTxt}>Location: mana2</Text>
                </View>
                <TouchableOpacity style={styles.btnSummon} onPress={() => { Actions.NewScreen(); }}>
                    <Text style={styles.text}>Summons</Text>
                </TouchableOpacity>

                <Footer style={styles.footer}>
                    <FooterTab style={{ backgroundColor: 'rgb(51, 52, 54)' }}>
                        <Button vertical onPress={this.goToNewScreen}>
                            <Icon name="user" size={25} color={'rgb(255,255,255)'} />
                            <Text style={{ color: 'white' }}>Profile</Text>
                        </Button>
                        <Button vertical onPress={() => { Actions.ListScreen(); }}>
                            <Icon name="history" size={25} color={'rgb(255,255,255)'} />
                            <Text style={{ color: 'white' }} >History</Text>
                        </Button>
                    </FooterTab>
                </Footer>

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
    btnLogout: {

        width: WIDTH - 280,
        height: 45,
        borderRadius: 50,
        backgroundColor: 'red',
        justifyContent: 'center',
        left: 100
    },
    avatarContainer: {
        alignItems: 'center',
        bottom: 60
    },
    avatarTxt: {
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 1.5,
        marginTop: 10
    },
    profileTxt: {
        color: 'white',
        fontSize: 15,
        letterSpacing: 1,
        marginBottom: 15
    },
    btnSummon: {
        width: WIDTH - 280,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'red',
        justifyContent: 'center',
        marginTop: 20,

    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17
    },
    footer: {
        position: 'absolute',
        bottom: 0,

    }
})