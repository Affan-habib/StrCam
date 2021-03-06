import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';
import IconButton from '../components/IconButton';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
// import CameraRoll from '@react-native-community/cameraroll';

export default function Camera() {
    const toast = useToast();
    const [{ cameraRef }, { takePicture }] = useCamera(null);
    console.log(RNFS)
    const captureHandle = async () => {
        try {
            const data = await takePicture();
            console.log(data.uri);
            const filePath = data.uri;
            const newFilePath = RNFS.PicturesDirectoryPath + `/str_cam_by_affan_${moment().hours(Number)}.jpg`;
            RNFS.moveFile(filePath, newFilePath)
                .then(() => {
                    
                    toast.show("Image saved to" + newFilePath , {type: "success"});
                })
                .catch(error => {
                    console.log(error);
                })
            } catch (error) {
                console.log(error);
            }
    }

    return (
        <View style={styles.body}>
            <RNCamera
                ref={cameraRef}
                type={RNCamera.Constants.Type.back}
                style={styles.preview}
            >
                <View style={{marginBottom: 35}}>
                <IconButton
                    name="linked-camera"
                    color="#0e9594"
                    bgcolor="white"
                    onPressFunction={() => captureHandle()}
                />
                </View>
            </RNCamera>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    preview: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
});