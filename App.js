import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import ListScreen from './src/screens/ListScreen';
import NewScreen from './src/screens/NewScreen';
import ViewScreen from './src/screens/ViewScreen';
import LoginScreen from './src/screens/LoginScreen';
import MapScreen from './src/screens/MapScreen';
import Personal from './src/screens/Personal';

export default class App extends Component {
  render() {
    return (
      <Router navigationBarStyle={{backgroundColor: 'rgb(51, 52, 54)'}} titleStyle={{color: 'white', fontWeight: 'bold'}}>
        <Scene key="root" wrap={false}>
          <Scene key="LoginScreen" component={LoginScreen} left={()=>null} initial={true} hideNavBar={true} />
          <Scene key="Personal" component={Personal} left={()=>null} title="Profile" />
          <Scene key="ListScreen" component={ListScreen} left={()=>null} title="Saman Track" hideNavBar={true} />
          <Scene key="NewScreen" component={NewScreen} left={()=>null} title="Add Summon" />
          <Scene key="ViewScreen" component={ViewScreen} left={()=>null} title="View Summon" />
          <Scene key="MapScreen" component={MapScreen} left={()=>null} title="Location" />
        </Scene>
      </Router>
    )
  }
}