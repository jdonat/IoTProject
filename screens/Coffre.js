import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View , Modal } from 'react-native';
import { useState, useEffect } from 'react'
import Toast from 'react-native-root-toast'
import CameraComponent from './components/CameraComponent'

export default function Coffre() {

   const [coffreContent, setCoffreContent] = useState([])

  const [modalAddDescriptionVisible, setModalAddDescriptionVisible] = useState(false)
  const protocol = 'http://'
  const ip = '192.168.90.160'
    // 10.42.0.1 for localhost on Raspberry Hotspot
  // 10.42.0.153 for testing with Java server on Ju's computer and with Raspberry Hotspot
  //192.168.90.160 on Ju's phone hotspot
  const port = '8080'
  const url = protocol+ip+':'+port+'/'

  //const shiftCode = 15
// shift = 7 pour changement code


  function changeModalAddDescriptionVisibility()
  {
      setModalAddDescriptionVisible(!modalAddDescriptionVisible);
  }

  function CaesarCryptoEncode(text) {
    let resultat = '';
    if (text === '' || text === null || text.trim() === '') {
        resultat = '';
        return resultat;
    }
    for (let i = 0; i < text.length; i++) {
        let AsciiFor = text.charCodeAt(i);
        let NewAscii;

        if ((AsciiFor >= 65 && AsciiFor <= 90) || (AsciiFor >= 97 && AsciiFor <= 122)) {
            NewAscii = AsciiFor + shiftCode;

            if (AsciiFor >= 65 && AsciiFor <= 90) {
                NewAscii = (NewAscii - 65) % 26 + 65;
                if (NewAscii < 65) {
                    NewAscii += 26;
                }
            } else if (AsciiFor >= 97 && AsciiFor <= 122) {
                NewAscii = (NewAscii - 97) % 26 + 97;
                if (NewAscii < 97) {
                    NewAscii += 26;
                }
            }
        } else if (AsciiFor >= 48 && AsciiFor <= 58) {
            let base = 48;
            NewAscii = (((AsciiFor + shiftCode) - base + 10) % 10) + base;
        } else {
            NewAscii = AsciiFor;
        }
        resultat += String.fromCharCode(NewAscii);
    }
    return resultat;
  }

   async function handleItemDescription(action, desc, id) {
    let route = 'contenu'
    let jsone = `{"description": "${desc}"}`
    const urlEncodedData = new URLSearchParams(desc).toString()
    //console.log(JSON.stringify(jsone))
    console.log("JSON : ", jsone)
    //let jsone = {}
    //'Authorization': `None ${base64String}`,
    //let jso = JSON.stringify(jsone)
    //console.log(jso)
    switch(action) {
      case 'add':
        try {
            const response = await fetch(url+route, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: `${jsone}`
              ,
            })
            let resp = await response.text()
            Toast.show(`add Item to ${route} : ${resp}`)
            console.log("Response :",resp)
         } catch (error) {
            console.error(error)
         }
      break
      case 'delete':
        try {
            const response = await fetch(url+route+"/"+id)
            let resp = await response.text()
            Toast.show(`delete Item to ${route} at id = ${id}: ${resp}`)
            console.log(resp)
         } catch (error) {
            console.error(error)
         }
      break
      default :
      break
    }

   }

   async function adminSection(route) {
      try {
            const response = await fetch(url+route)
            let resp = await response.json()
            Toast.show(`${route} : ${resp}`)
         } catch (error) {
            console.error(error)
         }
   }

   async function fetchContentData() {
      let arr = []
      let route = 'contenus'
         try {
            const response = await fetch(url+route)
            //
            const data = await response.json()
            if(data.id != null)
            {
                  arr.push(data)
               
            }
         } catch (error) {
            console.error(error)
         }
      
      setCoffreContent([...coffreContent, ...arr])
   }

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
              onPress={() => changeModalAddDescriptionVisibility()}>
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
               <ContentItem 
               contentDescription={item.description} contentImage={item.imageData} 
               contentId={item.id}
               />}
               keyExtractor={item => item.id}
            />
      </View>

         <StatusBar style="auto" />

    </View>
  )

}

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
    paddingLeft: 10,
    margin: 20
  },
  modalView: {
    backgroundColor: 'grey',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});