import { Image, Text, StyleSheet, View, Pressable } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Toast from 'react-native-root-toast'
export default function ContentItem({ contentId, contentDescription, onDelete })
{
  const url = 'http://10.42.0.1:8080/'
  const route = 'image/'
  const path = url+route+contentId

  async function deleteContent() {
    const road = 'contenu/delete/'
      try {
            const response = await fetch(url+road+contentId, {
              method: 'DELETE'
            })
            let resp = await response.text()
            Toast.show(`Remove Item to ${route} : ${resp}`)
            console.log("Response :",resp)
         } catch (error) {
            console.error(error)
         }
  }
      return (
   <View style={styles.container}>
      <Image source={{ uri: path }} style={styles.image} />
      <Text style={styles.description}>{contentDescription}</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          deleteContent()
          onDelete()
        }}>
            <Entypo name="cross" color='red' size={40} />
      </Pressable>
   </View>
   )
}
const styles = StyleSheet.create({
  container: {
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
})