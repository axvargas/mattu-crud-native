import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

const Bar = ({ navigation, route }) => {
    const handlePress = () => {
        navigation.navigate('NewClient')
    }
    return (
        <Button
            icon="plus-circle"
            color='#FFF'
            onPress={() => handlePress()}
        >
            Client
        </Button>
    )
}

export default Bar

const styles = StyleSheet.create({})
