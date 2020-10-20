import React, { useState } from 'react'
import { Alert, StyleSheet, View, Platform } from 'react-native'
import { Headline, Text, Subheading, Portal, FAB } from 'react-native-paper'
import globalStyles from '../styles/global'
import Axios from 'axios'

const ClientDetails = ({ navigation, route }) => {
    const { name, telephone, email, company, id } = route.params.client
    const [state, setState] = useState({ open: false });
    const { open } = state;

    const onStateChange = ({ open }) => setState({ open });

    const showConfirmation = () => {
        Alert.alert(
            'Would you like to delete this client?',
            'The client will be permanently deleted, and it will be impossible to recover it',
            [
                { text: 'Yes, delete', onPress: () => deleteClient() },
                { text: 'Cancel', style: 'cancel' }
            ],
            { cancelable: false }
        )
    }

    const deleteClient = async () => {
        try {
            const URL = Platform.OS === 'ios' ? `http://localhost:3000/clients/${id}` : `http://10.0.2.2:3000/clients/${id}`
            await Axios.delete(URL)
            navigation.navigate("Home")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={globalStyles.container}>
            <Headline style={globalStyles.title}>{name}</Headline>
            <Text style={styles.text}>Company: <Subheading>{company}</Subheading></Text>
            <Text style={styles.text}>Email: <Subheading>{email}</Subheading></Text>
            <Text style={styles.text}>Telephone: <Subheading>{telephone}</Subheading></Text>
            <Portal>
                <FAB.Group
                    open={open}
                    icon={open ? "close" : "dots-vertical"}
                    actions={[
                        {
                            icon: "delete",
                            label: 'Delete',
                            onPress: () => showConfirmation(),
                        },
                        {
                            icon: "pencil",
                            label: 'Edit',
                            onPress: () => navigation.navigate('NewClient', { client: route.params.client }),
                        }
                    ]}
                    onStateChange={onStateChange}
                />
            </Portal>
        </View>
    )
}

export default ClientDetails

const styles = StyleSheet.create({
    text: {
        marginBottom: 20,
        fontSize: 18
    },
})
