import React, { Component } from 'react';
import { Text, ListItem, Left, Right, Icon } from 'native-base';
import PropTypes from 'prop-types';

export default class SummonList extends Component {

  static propTypes = {
      students: PropTypes.array.isRequired
  };

   onPress = (summonid) => {
    this.props.onPress(summonid);
  }

  onLongPress = (summonid) => {
    this.props.onLongPress(summonid);
  }

  render() {
    return(
      this.props.students.map((data, index) => {
        return(
          <ListItem key={index} onPress={() => this.onPress(data.summonid)} onLongPress={() => this.onLongPress(data.summonid)}>
          <Left>
          <Text>{data.summonid}</Text>
          </Left>
          <Right>
          <Icon name="arrow-forward" />
          </Right>
          </ListItem>
        )
      })
    )
  }
}