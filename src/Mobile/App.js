import React from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {ipport: "http://192.168.1.:37001"};
  }
  
  onPress() {
    alert("Alarm kapatıldı.");

    return;
    
    fetch("http://127.0.0.1:37001/api/disablealarm", { method: 'GET' })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Raspberry Pi</Text>
        <TouchableHighlight onPress={this.onPress}>
          <Text style={styles.button}>Alarmı Kapat</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25
  },
  button: {
    fontSize: 18,
    padding: 20,
    marginTop: 25,
    width: 200,
    textAlign: 'center',
    backgroundColor: '#eeeeee'
  }
});
