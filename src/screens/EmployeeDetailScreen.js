import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../firebase';
import { setData } from '../../shared/actions/counterActions';
import Spinner from 'react-native-loading-spinner-overlay'

function EmployeeDetailScreen({ navigation }) {

    const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer.user)
    const [loading, setLoading] = React.useState(false)

    let getEmpData = () => {
        setLoading(true)

        fetch(
            'https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001'
        )
            .then(res => res.json())
            .then(res => {
                dispatch(setData(res))
                setLoading(false)
                navigation.navigate('ShowEmp')
            }).catch(error => {
                setLoading(false)
                console.log(error)
            })
    }

    let handleSignout = () => {
        setLoading(true)
        auth.signOut()
        setLoading(false)
        navigation.replace('Login')
    }

    return (
        <View style={styles.container}>
            {
                loading ? (
                    <Spinner
                        visible={true}
                        textStyle={styles.spinnerTextStyle}
                    />
                ) : (
                    <>
                        <Text style={styles.text}>Hey, {user.displayName}</Text><View style={styles.btnContainer}>
                            <TouchableOpacity
                                onPress={() => getEmpData()}>
                                <Text style={[styles.btnSignout, styles.btnGetInfo]}>Get Employee Info</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleSignout()}>
                                <Text style={styles.btnSignout}>Sign Out</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )
            }

        </View>
    )
}

export default EmployeeDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 30,
        textTransform: 'capitalize',
        marginBottom: 20,
    },
    btnContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
    },
    btnSignout: {
        textAlign: 'center',
        width: '100%',
        backgroundColor: '#d9534f',
        color: 'white',
        fontSize: 20,
        borderRadius: 100,
        marginBottom: 20,
        paddingVertical: 15
    },
    btnGetInfo: {
        backgroundColor: '#5bc0de',
        color: 'white'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
})