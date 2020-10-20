import React, { useCallback, useState } from 'react'
import { StyleSheet, View, Platform, FlatList } from 'react-native'
import { List, Headline, FAB } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native';
import Axios from 'axios'
import globalStyles from '../styles/global'

const Home = ({ navigation }) => {
    const [clients, setClients] = useState([])
    useFocusEffect(
        useCallback(
            () => {
                const getClientsAPI = async () => {
                    try {
                        const URL = Platform.OS === 'ios' ? 'http://localhost:3000/clients' : 'http://10.0.2.2:3000/clients'
                        const response = await Axios.get(URL)
                        setClients(response.data)
                    } catch (error) {
                        console.log(error)
                    }
                }
                getClientsAPI()
            },
            [setClients],
        )
    )

    return (
        <View style={globalStyles.container}>
            <Headline style={globalStyles.title}>{clients.length > 0 ? "Clients" : 'No clients yet'}</Headline>
            <FlatList
                data={clients}
                renderItem={({ item: client }) => (
                    <List.Item
                        title={client.name}
                        description={client.company}
                        onPress={() => navigation.navigate('ClientDetails', { client })}
                    />
                )}
                keyExtractor={(client) => client.id.toString()}
            />
            <FAB
                icon='plus'
                style={styles.fab}
                onPress={() => navigation.navigate('NewClient')}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0
    }
})
