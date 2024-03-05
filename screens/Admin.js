import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View , Modal } from 'react-native';
import { useState, useEffect } from 'react'
import Toast from 'react-native-root-toast'
import base64 from 'react-native-base64'


export default function Admin() {

  const [oldCode, setOldCode] = useState("")
  const [newCode, setNewCode] = useState("")
  const [newCode2, setNewCode2] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const protocol = 'http://'
  const ip = '10.42.0.1'
    // 10.42.0.1 for localhost on Raspberry Hotspot
  // 10.42.0.153 for testing with Java server on Ju's computer and with Raspberry Hotspot
  //192.168.90.160 on Ju's phone hotspot
  const port = '8080'
  const url = protocol+ip+':'+port+'/'

  //const shiftCode = 15
// shift = 7 pour changement code

  async function checkCodeAndSubmitChange() {
    const route = 'admin/coffre'
      if(newCode != newCode2)
      {
        setErrorMessage("Le nouveau code ne correspondent pas")
        return 0
      }
      else {
        try {
          let formData = new FormData()
          let oCd = CaesarCryptoEncode(oldCode, 7)
          let nCd = CaesarCryptoEncode(newCode, 7)
          formData.append('oldCode', oCd)
          formData.append('newCode', nCd)

            const response = await fetch(url+route, {
              method: 'PUT',
              headers: { 
                'Authorization': 'Basic '+ base64.encode('admin:admin'),
                'Content-type': 'multipart/form-data' },
              body: formData,
            })
            
            let resp = await response.text()
            Toast.show(`change Code to ${route} : ${resp}`)
            console.log("Response :",resp)
         } catch (error) {
            console.error(error)
         }
      }
  }

  function CaesarCryptoEncode(text, shiftCode) {
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

  async function safeAction(route, code) {
    let cryptCode = CaesarCryptoEncode(code)
    console.log('code : '+code+'  crypt : '+cryptCode)
         try {
            const response = await fetch(url+route, {
              method: 'POST',
              headers: {
                Accept: 'text/plain',
                'Content-Type': 'text/plain',
              },
              body: `${cryptCode}`
              ,
            })
            
            let resp = await response.text()
            Toast.show(`${route} : ${resp}`)
         } catch (error) {
            console.error(error)
         }
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



   return (
    <View style={styles.container}>


      <Text style={styles.title}>Admin Section</Text>
      <TextInput style={styles.input}
               onChangeText={setOldCode}
               value={oldCode}
               placeholder="Entrez l'ancien code"
      ></TextInput>
      <TextInput style={styles.input}
               onChangeText={setNewCode}
               value={newCode}
               placeholder='Entrez le nouveau code'
      ></TextInput>
      <TextInput style={styles.input}
               onChangeText={setNewCode2}
               value={newCode2}
               placeholder='Confirmez le nouveau code'
      ></TextInput>
      <Pressable
            style={styles.button}
            onPress={() => checkCodeAndSubmitChange()}>
        <Text style={styles.buttonText}>Envoyer</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

  },
  title: {
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 100,
    fontSize: 20
  },
  input: {
    padding: 10,
    borderWidth: 2,
    margin: 15,
    width: 200
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  buttonText: {
    backgroundColor: 'green',
    height: 40,
    width: 100,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',

  }
});