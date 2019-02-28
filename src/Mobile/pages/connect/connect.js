import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Database, { Settings } from '../../data/database'

export default class ConnectPage extends Component {
    static navigationOptions = {
        header: null
    }
    
    constructor() {
        super();

        this.state = {
            host: Settings.API_HOST,
            port: Settings.API_PORT
        };

        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        const { state } = this;

        Settings.API_HOST = state.host;
        Settings.API_PORT = state.port;

        const db = new Database();

        db.teachers()
            .then(x => {
                if (x != null) {
                    console.log(x);

                    this.props.navigation.navigate('School');
                }
            })
            .catch(x => console.error(x));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Raspberry Pi</Text>
                <View style={styles.inputs}>
                    <View style={styles.inputRow}>
                        <Text style={styles.label}>Host:</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.host}
                            onChangeText={(text) => this.setState({ host: text })}
                        />
                    </View>
                    <View style={styles.inputRow}>
                        <Text style={styles.label}>Port:</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.port}
                            onChangeText={(text) => this.setState({ port: text })}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.onPress}>
                    <Text style={styles.buttonText}>Başla</Text>
                </TouchableOpacity>
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
        fontSize: 28,
        marginBottom: 15
    },
    inputs: {
        width: 300,
        fontSize: 18
    },
    label: {
        fontSize: 20
    },
    input: {
        marginBottom: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: '#cccccc',
        fontSize: 16,
    },
    button: {
        marginTop: 25,
    },
    buttonText: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        width: 200,
        textAlign: 'center',
        backgroundColor: '#eeeeee'
    }
});
