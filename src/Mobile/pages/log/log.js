import React, { Component } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import Database from '../../data/database';
import { STATUS } from '../../utils/constans';

export default class LogPage extends Component {
    static navigationOptions = {
        title: 'Kayıtlar'
    }

    constructor(props) {
        super(props);

        const raspberryId = props.navigation.getParam("raspberryId", "");

        this.state = {
            loading: true,
            data: []
        };

        const db = new Database();
        db.logs(raspberryId)
            .then(x => {
                this.setState({ loading: false, data: x });
            })
            .catch(x => {
                console.log(x);
                Alert.alert("Hata", "Veriler alınırken bir sorun oluştur.");
            });
    }

    renderRow(item, index) {
        const colors = [
            "black",
            "green",
            "red"
        ]

        return (
            <View key={index.toString()} style={styles.row}>
                <Text style={{color: colors[item.status]}}>{item.raspberry.name}</Text>
                <Text style={{color: colors[item.status]}}>{STATUS[item.status]}</Text>
                <Text style={{color: colors[item.status]}}>{item.additionalData}</Text>
                <Text style={{color: colors[item.status]}}>{item.createdDate}</Text>
            </View>
        );
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.indicator}>
                    <ActivityIndicator />
                </View>
            );
        }

        console.log(this.state.data);

        return (
            <ScrollView>
                <View>
                    {this.state.data.map((x, i) => this.renderRow(x, i))}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    row: {
        marginBottom: 10,
        padding: 10,
    }
});
