import { Image, Text, StyleSheet, View } from 'react-native'

export default function ContentItem({ contentDescription, contentImage, contentId })
{
  const id = contentId
  const url = 'http://192.168.90.160:8080/image/'
  console.log(url+id)
      return (
   <View style={styles.container}>
         <Image
            style={styles.image}
            source= {{uri: `${url}${id}`}}
         />
        <Text style={styles.description}>{contentDescription}</Text>
   </View>
   )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(101,83,47)',
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