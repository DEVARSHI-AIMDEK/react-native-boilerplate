import { StyleSheet, Text, View, TextInput, Button, ToastAndroid, TouchableNativeFeedback, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect } from 'react'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase'
import { Formik } from 'formik';
import * as yup from 'yup'
import { useDispatch } from 'react-redux';
import { setUser } from '../../shared/actions/userActions'
import Spinner from 'react-native-loading-spinner-overlay'

const LoginSchema = yup.object({
    email: yup.string().required().test('is-valid-email', 'Enter valid email', (val) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(val)
    }),
    password: yup.string().required().min(6)
})

const LoginScreen = ({ navigation }) => {

    const [loading, setLoading] = React.useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            if (user) {
                // console.log(user)
            }
        })

        return unsubscribe
    }, [])

    function hangleSignUpClicked() {
        navigation.navigate('Signup')
    }

    function handleLogIn(email, password) {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(userCred => {
                const user = userCred.user
                dispatch(setUser(user))
                setLoading(false)
                navigation.replace('Employee')
            })
            .catch((error) => {
                Alert.alert('Error!', error.message)
                setLoading(false)
            })
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
            }}>

            <View style={styles.container}>
                {
                    loading
                        ? (
                            <Spinner
                                visible={true}
                                textContent={'Logging you in...'}
                                textStyle={styles.spinnerTextStyle}
                            />
                        )
                        : (
                            <View style={styles.container}>

                                <Text style={styles.text}>Log In</Text>

                                <Formik
                                    initialValues={{
                                        email: '',
                                        password: ''
                                    }}
                                    validationSchema={LoginSchema}
                                    onSubmit={(values, actions) => {
                                        handleLogIn(values.email, values.password)
                                        actions.resetForm()
                                    }}
                                >
                                    {(props) => (
                                        <View style={styles.inputContainer}>
                                            <View>
                                                <TextInput
                                                    value={props.values.email}
                                                    keyboardType='email-address'
                                                    onChangeText={props.handleChange('email')}
                                                    style={styles.input}
                                                    onBlur={props.handleBlur('email')}
                                                    placeholder='Enter Email'
                                                />
                                                <Text style={styles.errorMsg}>
                                                    {props.touched.email && props.errors.email}
                                                </Text>
                                                <TextInput
                                                    style={styles.input}
                                                    value={props.values.password}
                                                    onChangeText={props.handleChange('password')}
                                                    placeholder='Enter Password'
                                                    onBlur={props.handleBlur('password')}
                                                    secureTextEntry
                                                />
                                                <Text style={styles.errorMsg}>
                                                    {props.touched.password && props.errors.password}
                                                </Text>
                                            </View>
                                            <View style={styles.btnContainer}>
                                                <TouchableNativeFeedback
                                                    onPress={props.handleSubmit}>
                                                    <Text style={styles.btnLogin}>Log In</Text>
                                                </TouchableNativeFeedback>
                                                <TouchableNativeFeedback
                                                    onPress={() => { hangleSignUpClicked() }}>
                                                    <Text style={[styles.btnLogin, styles.btnSignup]}>Sign Up</Text>
                                                </TouchableNativeFeedback>
                                            </View>
                                        </View>
                                    )}
                                </Formik>
                            </View>
                        )
                }
            </View>
        </TouchableWithoutFeedback >
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 46,
        color: 'black',
    },
    inputContainer: {
        width: '90%',
        marginTop: 20,
        marginVertical: 10,
    },
    input: {
        width: '100%',
        borderBottomColor: 'black',
        paddingVertical: 15,
        fontSize: 18,
        paddingHorizontal: 5,
        borderBottomWidth: 2
    },
    btnContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
    },
    btnLogin: {
        textAlign: 'center',
        width: '100%',
        backgroundColor: 'black',
        color: 'white',
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 100,
        paddingVertical: 15
    },
    btnSignup: {
        marginTop: 10,
        backgroundColor: 'transparent',
        borderColor: 'black',
        borderWidth: 1,
        color: 'black',
    },
    errorMsg: {
        textAlign: 'center',
        marginTop: 5,
        color: 'red',
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
})