import { StyleSheet, Text, View, Button, Image} from 'react-native';
import { useState, useEffect } from 'react'
import { Camera } from 'expo-camera'
import Toast from 'react-native-root-toast'
        

export default function CameraComponent() {
   const [hasCameraPermission, setHasCameraPermission] = useState(null);
   const [camera, setCamera] = useState(null);
   const [image, setImage] = useState(null);
   const [type, setType] = useState(Camera.Constants.Type.back);


  const protocol = 'http://'
  const ip = '192.168.90.160'
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
      console.log("upload file uri :",data.uri)

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
          console.log("Response :",resp)
            Toast.show(`${route} : ${resp}`)
         } catch (error) {
            console.error(error)
         }
   }
    const takePicture = async () => {
    if(camera){
      try{
        const data = await camera.takePictureAsync({"quality": 0})
        setImage(data.uri)
        //uploadImage(data)
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
    fontSize: 20,
    
  },

  cameraContainer: {
    height: 300,
    width: 300
  },
  fixedRatio: {
    height: 300,
    width: 300,
    marginTop: 100
  },
  image: {
    height: 400,
    width: 400
  }
});
