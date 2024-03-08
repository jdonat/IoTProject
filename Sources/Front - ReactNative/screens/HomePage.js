import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react'
import Toast from 'react-native-root-toast'


export default function HomePage() {

  const [code, setCode] = useState('')
  const protocol = 'http://'
  const ip = '10.42.0.1'
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
    let formData = new FormData()
    formData.append('code', cryptCode)
         try {
            const response = await fetch(url+route, {
              method: 'POST',
              headers: { 
                'Content-type': 'multipart/form-data' },
              body: formData,
            })
            
            let resp = await response.text()
            Toast.show(resp)
         } catch (error) {
            console.error(error)
         }
   }

   function onPressedOut() {
    Keyboard.dismiss()
   }
   return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Saisissez le code de déverrouillage</Text>
      <TouchableWithoutFeedback onPress={onPressedOut
      } accessible={false}>
      <Image
        style={styles.stretch}
        source={require('../assets/ser.png')}
      />
      </TouchableWithoutFeedback>
        <TextInput
          style={styles.input}
          onChangeText={setCode}
          value={code}
          keyboardType="numeric"
          maxLength={4}
          secureTextEntry
        />
      
        <Pressable
              style={styles.button}
              onPress={() => safeAction('coffreopen', code)}>
          <Text style={styles.buttonText}>Déverrouiller</Text>
        </Pressable>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BDFEFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007C5E',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    height: 40,
    width: 220,
    borderRadius: 5
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20
  },
  input: {
    backgroundColor: 'white',
    width: 200,
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    marginTop: 20
  },
  title: {
     fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50
  },
  stretch: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
  }

});