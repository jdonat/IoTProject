import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useState, useEffect } from 'react'
import { Camera } from 'expo-camera'
        
        

export default function CameraComponent() {
   const [hasCameraPermission, setHasCameraPermission] = useState(null);
   const [camera, setCamera] = useState(null);
   const [image, setImage] = useState(null);
   const [type, setType] = useState(Camera.Constants.Type.back);

         

   useEffect(() => {
      (async () => {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
      })();
  }, []);

    useEffect(() => {
      if(image != null)
        console.log("image taken")
  }, [image]);


    const takePicture = async () => {
    if(camera){
      try{
        console.log("takePicture")
        const data = await camera.takePictureAsync(null)
        setImage(data.uri);
        console.group("Image uri :", data.uri)
      }catch(e){
        console.log(e)
      }
    }
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

   return (
      
   <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera 
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio} 
            type={type}
            ratio={'1:1'} 
        />
      </View>
      <Button
            title="Flip Image"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
      </Button>
      <Button title="Take Picture" onPress={() => takePicture()} />
   
      <View style={styles.imageView}>
        <Image source={{uri: image}} style={styles.image}/>
      </View>
   </View>
   )}
   
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    height: 40,
    width: 220
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20
  },
  input: {
    height: 40,
    width: 220,
    borderWidth: 2,
    paddingLeft: 10
  },
  cameraContainer: {
    height: 400,
    width: 400
  },
  fixedRatio: {
    height: '100%',
    width: '100%'
  },
  image: {
    height: 400,
    width: 400
  }
});
