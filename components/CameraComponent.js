import { StyleSheet, Text, View, Button, TextInput, ScrollView, Image }  from 'react-native';
import { useState, useEffect } from 'react'
import { Camera } from 'expo-camera'
import Toast from 'react-native-root-toast'
        

export default function CameraComponent() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [description, setDescription] = useState('');

  const protocol = 'http://'
  const ip = '10.42.0.1'
    // 10.42.0.1 for localhost on Raspberry Hotspot
  // 10.42.0.153 for testing with Java server on Ju's computer and with Raspberry Hotspot
  //192.168.90.160 on Ju's phone hotspot
  const port = '8080'
  const url = protocol+ip+':'+port+'/'

   useEffect(() => {
      (async () => {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
      })();
  }, []);

   async function uploadImage(data){
      let route = 'contenuimage'
      let formData = new FormData()
      formData.append('imagedata', {
         name: data.uri.substr(-38),
         type: 'image/jpeg',
         uri: data.uri
      })
      formData.append('description', description)
         try {
            const resp = await fetch(url+route, {
            method: 'POST',
            headers: { 'Content-type': 'multipart/form-data' },
            body: formData,
          })
          //type, status, ok, statusText, headers, url, bodyUsed, _bodyInit, _bodyBlob
         } catch (error) {
            console.error(error)
         }
   }
    const takePicture = async () => {
    if(camera){
      try{
        const data = await camera.takePictureAsync()
        setImage(data.uri)
        uploadImage(data)
      }catch(e){
        console.log(e)
      }
    }
  }
  if (hasCameraPermission === false) {
    return <Text style={styles.error}>No access to camera</Text>;
  }

   return (
   <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.cameraContainer}>
        <Camera 
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio} 
            type={type}
            ratio={'1:1'} 
        />
      </View>
      <View style={styles.buttonView}>
        <TextInput style={styles.input}
               onChangeText={setDescription}
               value={description}
               placeholder='Ajouter une description'
               maxLength={30}
        ></TextInput>
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
      </View>
      <View style={styles.imageView}>
        <Image source={{uri: image}} style={styles.image}/>
      </View>
   </ScrollView>
   )}
   
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -20
  },
  cameraContainer: {
    height: 300,
    width: 300,
    marginTop: 50
  },
  fixedRatio: {
    height: '100%',
    width: '100%',
  },
  buttonView: {
    marginTop: 20,
    marginLeft: 20
  },
  input: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10
  },
  imageView: {
    paddingTop: 30,
  },
  image: {
    height: 300,
    width: 300
  },
  error: {
    color: 'red',
    fontSize: 20
  }
});
