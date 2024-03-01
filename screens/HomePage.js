import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View , Modal } from 'react-native';
import { useState, useEffect } from 'react'
import Toast from 'react-native-root-toast'
import CameraComponent from './components/CameraComponent'

export default function HomePage() {

  const protocol = 'http://'
  const ip = '192.168.90.160'
    // 10.42.0.1 for localhost on Raspberry Hotspot
  // 10.42.0.153 for testing with Java server on Ju's computer and with Raspberry Hotspot
  //192.168.90.160 on Ju's phone hotspot
  const port = '8080'
  const url = protocol+ip+':'+port+'/'

  const shiftCode = 15
// shift = 7 pour changement code

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

   return (
    <View style={styles.container}>
      <ScrollView>
      <Text>Unlock Safe</Text>
      <Pressable
        style={styles.button}
        onPress={() => safeAction('coffreopen', '1234')}>
        <Text style={styles.buttonText}>Open with Right Code</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => safeAction('coffreopen', '5678')}>
        <Text style={styles.buttonText}>Open with False Code</Text>
      </Pressable>
      <StatusBar style="auto" />
      </ScrollView>
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
  }
});