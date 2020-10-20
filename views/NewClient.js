import React, { useEffect, useRef } from 'react'
import { StyleSheet, ScrollView, View, Platform } from 'react-native'
import { TextInput, HelperText, Headline, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'

import globalStyles from '../styles/global'
import Axios from 'axios'

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const rules = {
    name: {
        required: "Type the name please",
        validate: (value) => value.trim() !== '' || "Type the name please"
    },
    telephone: {
        required: "Type the telephone please",
        validate: (value) => value.trim() !== '' || "Type the telephone please",
        pattern: {
            value: phoneRegExp,
            message: "Type a valid telephone please"
        }
    },
    email: {
        required: "Type the email please",
        validate: (value) => value.trim() !== '' || "Type the email please",
        pattern: {
            value: emailRegex,
            message: "Type a valid email please"
        }
    },
    company: {
        required: "Type the company please",
        validate: (value) => value.trim() !== '' || "Type the company please"
    }
}
const NewClient = ({ navigation, route }) => {

    const { control, handleSubmit, errors, reset } = useForm({
        defaultValues: {
            name: route.params?.client.name || '',
            telephone: route.params?.client.telephone || '',
            email: route.params?.client.email || '',
            company: route.params?.client.company || ''
        },
        mode: 'onBlur'
    })
    const nameRef = useRef()
    const telephoneRef = useRef()
    const emailRef = useRef()
    const companyRef = useRef()

    const onSubmit = async (data) => {
        try {
            const newClient = {
                name: data.name.trim(),
                telephone: data.telephone.trim(),
                email: data.email.trim(),
                company: data.company.trim()
            }
            if (route.params?.client) {
                const { id } = route.params.client
                const URL = Platform.OS === 'ios' ? `http://localhost:3000/clients/${id}` : `http://10.0.2.2:3000/clients/${id}`
                await Axios.put(URL, newClient)
                reset()
                navigation.navigate('Home')
            } else {
                const URL = Platform.OS === 'ios' ? 'http://localhost:3000/clients' : 'http://10.0.2.2:3000/clients'
                await Axios.post(URL, newClient)
                reset()
                navigation.navigate('Home')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ScrollView style={globalStyles.container}>
            <Headline style={globalStyles.title}>{route.params?.client ? "Edit Client" : "New Client"}</Headline>
            <View style={styles.viewInput}>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    onFocus={() => {
                        nameRef.current.focus();
                    }}
                    rules={rules.name}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            id="name"
                            name="name"
                            label="Type your name"
                            onChangeText={(value) => {
                                onChange(value)
                            }}
                            error={errors.name}
                            value={value}
                            ref={nameRef}
                        />
                    )}
                />
                {errors.name &&
                    <HelperText type="error" visible={errors.name}>
                        {errors.name.message}
                    </HelperText>
                }
            </View>
            <View style={styles.viewInput}>
                <Controller
                    name="telephone"
                    control={control}
                    defaultValue=""
                    onFocus={() => {
                        telephoneRef.current.focus();
                    }}
                    rules={rules.telephone}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            id="telephone"
                            name="telephone"
                            label="Type the telephone"
                            onChangeText={(value) => {
                                onChange(value)
                            }}
                            error={errors.telephone}
                            value={value}
                            ref={telephoneRef}
                        />
                    )}
                />
                {errors.telephone &&
                    <HelperText type="error" visible={errors.telephone}>
                        {errors.telephone.message}
                    </HelperText>
                }
            </View>
            <View style={styles.viewInput}>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    onFocus={() => {
                        emailRef.current.focus();
                    }}
                    rules={rules.email}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            id="email"
                            name="email"
                            label="Type the email"
                            onChangeText={(value) => {
                                onChange(value)
                            }}
                            error={errors.email}
                            value={value}
                            ref={emailRef}
                        />
                    )}
                />
                {errors.email &&
                    <HelperText type="error" visible={errors.email}>
                        {errors.email.message}
                    </HelperText>
                }
            </View>
            <View style={styles.viewInput}>
                <Controller
                    name="company"
                    control={control}
                    defaultValue=""
                    onFocus={() => {
                        companyRef.current.focus();
                    }}
                    rules={rules.company}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            id="company"
                            name="company"
                            label="Type the company"
                            onChangeText={(value) => {
                                onChange(value)
                            }}
                            error={errors.company}
                            value={value}
                            ref={companyRef}
                        />
                    )}
                />
                {errors.company &&
                    <HelperText type="error" visible={errors.company}>
                        {errors.company.message}
                    </HelperText>
                }
            </View>
            <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                style={styles.btn}
            >
                {route.params?.client ? "Edit Client" : "Add client"}
            </Button>
        </ScrollView>
    )
}

export default NewClient

const styles = StyleSheet.create({
    viewInput: {
        marginBottom: 15
    },
    btn: {
        marginTop: 15
    }
})
