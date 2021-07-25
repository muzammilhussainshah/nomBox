import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './Store';
import Route from './Routes';
import { StatusBar } from "react-native";
class App extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    console.disableYellowBox = true
    StatusBar.setHidden(true)

  }
  render() {
    return (
      <Provider store={store}>

        <Route />
      </Provider>
    );
  }
}

export default App;