import React, { Component } from 'react'
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Database from '../../data/database'


export default class SchoolPage extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();

        this.state = {
            loading: true,
            raspberries: [],
        };

        this.load = this.load.bind(this);

        // Sürekli veriyi kontrol edip güncellemesi için.
        this.timer = setInterval(this.load, 5000);

        this.goToLogPage = this.goToLogPage.bind(this);
    }

    load() {
        var db = new Database();

        db.raspberries()
            .then(x => {
                if (x == null) {
                    alert("null");

                    return;
                }

                this.setState({ loading: false, raspberries: x });
            })
            .catch(x => console.error(x));
    }

    changeRaspberryStatus(index, id, status) {
        const { raspberries } = this.state;
        const raspberry = raspberries[index];

        var db = new Database();

        db.updateRaspberry(id, status)
            .then(x => {
                raspberry.status = x;

                this.setState({ raspberries });
            })
            .catch(x => console.error(x));
    }

    goToLogPage(raspberryId) {
        this.props.navigation.navigate("Log", { raspberryId: raspberryId });
    }

    renderCard(item, index) {
        console.log(item);

        const btnStop = (
            <TouchableOpacity style={styles.button} onPress={() => this.changeRaspberryStatus(index, item.id, 0)}>
                <Text style={{ ...styles.buttonText, ...styles.buttonRed }}>Sistemi Kapat</Text>
            </TouchableOpacity>
        );

        const btnStart = (
            <TouchableOpacity style={styles.button} onPress={() => this.changeRaspberryStatus(index, item.id, 1)}>
                <Text style={{ ...styles.buttonText, ...styles.buttonGreen }}>Sistemi Başlat</Text>
            </TouchableOpacity>
        );

        const btnDeactiveAlarm = (
            <TouchableOpacity style={styles.button} onPress={() => this.changeRaspberryStatus(index, item.id, 1)}>
                <Text style={{ ...styles.buttonText, ...styles.buttonYellow }}>Alarmı Kapat</Text>
            </TouchableOpacity>
        );

        return (
            <View key={index.toString()} style={styles.raspberry}>
                <Text style={styles.title}>{item.name}</Text>
                <View style={styles.rowButtonLog}>
                    <TouchableOpacity onPress={() => this.goToLogPage(item.id)} style={styles.buttonLog}>
                        <Text style={styles.labelButtonLog}>Kayıtlar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttons}>
                    {
                        item.status == 0
                            ? btnStart
                            : item.status == 1
                                ? btnStop
                                : btnDeactiveAlarm
                    }
                </View>
            </View>
        );
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.wrapper}>
                <ScrollView>
                    <TouchableOpacity onPress={() => this.goToLogPage("")} style={styles.buttonAllLogs}>
                        <Text style={styles.labelAllLogsText}>Tüm Kayıtlar</Text>
                    </TouchableOpacity>
                    {this.state.raspberries.map((x, i) => this.renderCard(x, i))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: StatusBar.currentHeight,
        padding: 10,
    },
    buttonAllLogs: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#33E3FF',
    },
    labelAllLogsText: {
        textAlign: 'center',
        fontSize: 18,
    },
    raspberry: {
        borderWidth: 1,
        borderColor: '#cccccc',
        marginBottom: 15,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        padding: 5,
    },
    buttons: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
    },
    buttonText: {
        padding: 10,
        // height: 40,
        textAlign: 'center',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonRed: {
        backgroundColor: 'red',
        color: '#000000'
    },
    buttonGreen: {
        backgroundColor: 'green',
        color: 'white'
    },
    buttonYellow: {
        backgroundColor: '#00FFFF',
        color: 'black'
    },
    rowButtonLog: {
        marginBottom: 5,
        padding: 10,
    },
    buttonLog: {
        backgroundColor: '#eeeeee',
    },
    labelButtonLog: {
        margin: 10,
        textAlign: 'center'
    }
});
