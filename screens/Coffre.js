import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View , Modal, FlatList, ActivityIndicator, Image } from 'react-native';
import { useState, useEffect } from 'react'
import Toast from 'react-native-root-toast'
import Entypo from 'react-native-vector-icons/Entypo'
import CameraComponent from '../components/CameraComponent'


export default function Coffre() {

   const [coffreContent, setCoffreContent] = useState([])
  const [modalAddDescriptionVisible, setModalAddDescriptionVisible] = useState(false)
  const protocol = 'http://'
  const ip = '10.42.0.1'
    // 10.42.0.1 for localhost on Raspberry Hotspot
  // 10.42.0.153 for testing with Java server on Ju's computer and with Raspberry Hotspot
  //192.168.90.160 on Ju's phone hotspot
  const port = '8080'
  const url = protocol+ip+':'+port+'/'

  const imageRoute = 'image/'
  const path = url+imageRoute

  async function deleteContent(id) {
    const road = 'contenu/delete/'
      try {
            const response = await fetch(url+road+id, {
              method: 'DELETE'
            })
            let resp = await response.text()
            Toast.show(`Remove Item : ${resp}`)
            console.log("Response :",resp)
         } catch (error) {
            console.error(error)
         }
         fetchContentData()
  }


  //const shiftCode = 15
// shift = 7 pour changement code
  function changeModalAddDescriptionVisibility()
  {
      setModalAddDescriptionVisible(!modalAddDescriptionVisible);
  }
   async function fetchContentData() {
      let arr = []
      let route = 'contenus'
        try{

            const response = await fetch(url+route)
            const data = await response.json()
            if(data != null)
            {
                  arr = data
            }
         } catch (error) {
            console.error(error)
         }
      setCoffreContent(arr)
   }

  useEffect(() => {
    fetchContentData()
  },[])

   if(coffreContent == null)
   {
      return (
        <View style={styles.container}>
              <View style={styles.centeredView}>
                  <ActivityIndicator size="large" color="black" />
              </View>
            
        </View>
        )
   }
   else{
         return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAddDescriptionVisible}
        onRequestClose={() => {
          setModalAddDescriptionVisible(!modalAddDescriptionVisible);
        }}>
          <ScrollView contentContainerStyle={styles.modalView}>
            <CameraComponent />
            <Pressable
              style={styles.button}
              onPress={() => {
                changeModalAddDescriptionVisibility()
                fetchContentData()
              }}>
              <Text style={styles.textStyle}>Fermer</Text>
            </Pressable>
          </ScrollView>
      </Modal>
      <View>
         <Text>Contenu du Coffre</Text>
         <Pressable
            style={styles.button}
            onPress={() => changeModalAddDescriptionVisibility()}>
            <Text style={styles.buttonText}>Ajouter un objet</Text>
         </Pressable>
         <FlatList
               data={coffreContent}
               renderItem={({item}) => 
              <View style={styles.imageContainer}>
                <Image source={{ uri: path+item.id }} style={styles.image} />
                <Text style={styles.description}>{item.description}</Text>
                <Pressable
                  onPress={() => deleteContent(item.id)}>
                  <Entypo name="cross" color='red' size={40} />
                </Pressable>
              </View>
              }   
               keyExtractor={(item) => {return item.id }}
            />
      </View>

         <StatusBar style="auto" />

    </View>
  )
   }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   centeredView: {
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
    paddingLeft: 10,
    margin: 20
  },
  modalView: {
    backgroundColor: 'grey',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    height: 360,
    width: 320,
    padding: 30
  },
  description: {
  fontSize: 26,
  color: 'white',
  paddingBottom: 10,
  fontWeight: 'bold',
  textAlign: 'center'
 },
 image: {
   height: 200,
   width: 200,
   borderRadius: 5,
   padding: 20,
   margin: 20,
 }
});