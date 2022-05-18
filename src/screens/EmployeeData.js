import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useMemo, useRef } from 'react'
import { requestMediaLibraryPermissionsAsync, requestCameraPermissionsAsync } from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployee, setImage } from '../../shared/actions/counterActions';

const EmployeeData = ({ route }) => {
    let emp = route.params.item
    const dispatch = useDispatch()
    const [pickedImagePath, setPickedImagePath] = React.useState(emp.imageUrl);

    const renderContent = () => (
        <View
            style={{
                backgroundColor: 'white',
                padding: 16,
                height: 450,
            }}
        >
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    onPress={() => openCamera()}>
                    <Text style={styles.btnOpenCamera}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => showImagePicker()}>
                    <Text style={styles.btnOpenGallery}>Add from Gallery</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const sheetRef = React.useRef(null);

    const openCamera = async () => {
        const permissionResult = await requestCameraPermissionsAsync()

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        if (!result.cancelled) {
            console.log(result)
            dispatch(setImage(result.uri))
            setPickedImagePath(result.uri);
        }
    }

    const showImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();

        if (!result.cancelled) {
            setPickedImagePath(result.uri);
        }
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={() => sheetRef.current.snapTo(2)}>
                <View style={styles.container}>
                    <View style={styles.imgContainer}>
                        <Image source={{ uri: pickedImagePath }} style={styles.img} />
                    </View>
                    <View style={styles.data}>
                        <View style={styles.name}>
                            <Text style={styles.text}>{`${emp.firstName} ${emp.lastName}`}</Text>
                            <Text style={styles.text}>{emp.dob}</Text>
                            <Text style={styles.text}>{emp.email}</Text>
                        </View>
                    </View>
                    <View style={styles.btnPhotoContainer}>
                        <TouchableOpacity onPress={() => sheetRef.current.snapTo(1)}>
                            <Text style={styles.btnOpenModal}>Change Profile Picture</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[200, 200, 0]}
                initialSnap={2}
                borderRadius={10}
                renderContent={renderContent}
            />
        </>
    )
}

export default EmployeeData

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    imgContainer: {
        marginTop: 40,
    },
    img: {
        width: 200,
        borderRadius: 100,
        height: 200,
    },
    text: {
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 5
    },
    btnPhotoContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    btnOpenModal: {
        paddingVertical: 20,
        borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: '#5bc0de',
        fontSize: 20,
        color: 'white',
        marginBottom: 30,
        paddingHorizontal: 30
    },
    btnOpenCamera: {
        width: '100%',
        paddingVertical: 20,
        borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: '#5cb85c',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 30
    },
    btnOpenGallery: {
        width: '100%',
        paddingVertical: 20,
        textAlign: 'center',
        borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: '#0275d8',
        fontSize: 20,
        color: 'white',
        paddingHorizontal: 30
    }
})