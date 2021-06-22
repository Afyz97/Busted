import React, { Component } from 'react';
import {View} from 'react-native'
import { Container, Content, Text, Form, Item, Label } from 'native-base';
import { db } from '../config/db';

let studentsRef = db.ref('/summon');
console.disableYellowBox = true;

export default class ViewScreen extends Component {
  constructor() {
    super();
    this.state = {
      students: [],
      location: null,
      summonid: null,
      offence: null,
      output: null,
      postID: null
    }
  }

  componentDidMount() {
    let query = studentsRef.orderByChild("summonid").equalTo(this.props.summonid);
    query.once('value', (snapshot) => {
      let data = snapshot.val();
      if (data) {
        let firebaseData = Object.values(data);
        this.setState({ students: firebaseData }, () => {
          this.state.students.map((element) => {
            this.setState({
              camera: element.camera,
              location: element.location,
              summonid: element.summonid,
              offence: element.offence
            });
          });
        });
      }
    });

    this.offenceCheck();
  }


  offenceCheck = () => {
    let val = this.state.offence;
    for (let index = 1; index < 4; index++) {
      if (val == 1) {
        this.setState({ output: 'Not Wearing Helmet' });
      } else if (val == 2) {
        this.setState({ output: 'Unauthorized Parking' });
      } else if (val == 3) {
        this.setState({ output: 'No Sticker' });
      } else if (val == 4) {
        this.setState({ output: 'Exceed Speed Limit' });
      }
    }
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }}>Student Details</Text>
          <Text>{this.state.postID}</Text>
          <Item fixedLabel last>
            <Label>Summon ID</Label>
            <Text>{JSON.stringify(this.state.summonid)}</Text>
          </Item>
          <Item fixedLabel last>
            <Label>Camera</Label>
            <Text>{JSON.stringify(this.state.camera)}</Text>
          </Item>
          <Item fixedLabel last>
            <Label>Location</Label>
            <Text>{JSON.stringify(this.state.location)}</Text>
          </Item>

          <Item fixedLabel picker last>
            <Label>Offence</Label>
            <Text>{JSON.stringify(this.state.offence)}</Text>
          </Item>
          <View style={{marginTop: 20, borderWidth: 2, borderRadius: 20, padding: 10}}>
            <Text>1 - Not Wearing Helmet</Text>
            <Text>2 - Unauthorized Parking</Text>
            <Text>3 - No Sticker</Text>
            <Text>4 - Exceed Speed Limit</Text>
          </View>

        </Content>
      </Container>
    );
  }
}