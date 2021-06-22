import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { removeStudent } from '../services/DataService';
import { Alert } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, List } from 'native-base';
import { db } from '../config/db';
import SummonList from '../components/SummonList';
import * as firebase from 'firebase';

let studentsRef = db.ref('/summon');
console.disableYellowBox = true;

export default class ListScreen extends Component {
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


  render() {
    return (
      <Container>

        <Content padder>
          <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20, fontSize: 25 }}>Summon List</Text>
          <List vertical={true}>
            <SummonList students={this.state.students} onPress={(summonid) => { Actions.ViewScreen({ summonid: summonid }); }} />
          </List>
          <Text>{this.props.summonid}</Text>
        </Content>


      </Container>
    );
  }
}