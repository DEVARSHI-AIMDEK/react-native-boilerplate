import { StyleSheet, Text, View, TextInput, ToastAndroid, ImageBackground, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { updateProfile, createUserWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";
import { auth } from '../../firebase'
import { Formik } from 'formik';
import * as yup from 'yup'
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { setUser } from '../../shared/actions/userActions';
import { useDispatch } from 'react-redux';

const signupSchema = yup.object({
    username: yup.string().min(3).required(),
    email: yup.string().required().test('is-valid-email', 'Enter valid email', (val) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(val)
    }),
    password: yup.string().required().min(6),
    confirmPass: yup.string().required().oneOf([yup.ref('password')], "Passwords do not match")
})

const SignupScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const usersRef = collection(db, 'users')

    function handleSignup(email, password, username) {

        setLoading(true)

        createUserWithEmailAndPassword(auth, email, password, username)
            .then(res => {
                dispatch(setUser(res.user))
                addDoc(usersRef, { email, username })
                    .then(
                        console.log('user added')
                    )
                    .catch(error => {
                        console.log(error)
                    })
                updateProfile(auth.currentUser, {
                    displayName: username
                })
                Keyboard.dismiss()
                setLoading(false)
                navigation.replace('BottomNav')
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
                {loading ? (
                    <Spinner
                        visible={true}
                        textContent={'Signing you up...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                )
                    : (
                        <View style={styles.container}>

                            <Text style={styles.text}>Sign Up</Text>

                            <Formik
                                initialValues={{
                                    username: '',
                                    email: '',
                                    password: '',
                                    confirmPass: ''
                                }}
                                validationSchema={signupSchema}
                                onSubmit={(values, actions) => {
                                    handleSignup(values.email, values.password, values.username)
                                    Keyboard.dismiss()
                                    actions.resetForm()
                                }}
                            >
                                {(props) => (
                                    <View style={styles.inputContainer}>
                                        <View>
                                            <TextInput
                                                autoCapitalize={'words'}
                                                value={props.values.username}
                                                onChangeText={props.handleChange('username')}
                                                style={styles.input}
                                                onBlur={props.handleBlur('username')}
                                                placeholder='Enter Username'
                                            />
                                            <Text style={styles.errorMsg}>
                                                {props.touched.username && props.errors.username}
                                            </Text>
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
                                            <TextInput
                                                value={props.values.confirmPass}
                                                onChangeText={props.handleChange('confirmPass')}
                                                style={styles.input}
                                                keyboardType='visible-password'
                                                onBlur={props.handleBlur('confirmPass')}
                                                placeholder='Enter Password Again'
                                            />
                                        </View>
                                        <Text style={styles.errorMsg}>
                                            {props.touched.confirmPass && props.errors.confirmPass}
                                        </Text>
                                        <View style={styles.btnContainer}>
                                            <TouchableOpacity
                                                onPress={props.handleSubmit}>
                                                <Text style={styles.btnLogin}>Sign Up</Text>
                                            </TouchableOpacity>
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

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
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
        // marginVertical: 5,
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