import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const ShowEmployees = () => {

    const [data, setData] = React.useState()

    let temp = useSelector(state => state.employeeReducer.employee)
    React.useEffect(() => {
        setData(temp)
    }, [])

    return (
        <View style={styles.container}>
            {data &&
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.text}>
                                {`${item.firstName} ${item.lastName}`}
                            </Text>
                        </View>
                    )
                    }
                />
            }
        </View>
    )
}

export default ShowEmployees

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 24
    }
})