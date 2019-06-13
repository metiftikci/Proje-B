import React, { Component } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Database from '../../data/database';

export default class LoginPage extends Component {
    static navigationOptions = {
        title: "Login"
    }

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        const db = new Database();

        db.login(this.state.username, this.state.password)
            .then(x => {
                if (x) {
                    this.props.navigation.navigate('School');
                } else {
                    Alert.alert("Bir sorun oluştu.");
                }
            })
            .catch(x => {
                Alert("Hata");
            })
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.title}>Raspberry Pi</Text>
                <View style={styles.inputs}>
                    <View style={styles.inputRow}>
                        <Text style={styles.label}>Kullanıcı Adı:</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.username}
                            onChangeText={(text) => this.setState({ username: text })}
                        />
                    </View>
                    <View style={styles.inputRow}>
                        <Text style={styles.label}>Şifre:</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.password}
                            onChangeText={(text) => this.setState({ password: text })}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.onPress}>
                    <Text style={styles.buttonText}>Giriş Yap</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
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
