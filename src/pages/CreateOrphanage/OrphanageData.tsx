import * as ImagePiker from 'expo-image-picker';

import { Image, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import api from '../../services/api';

interface ParamProps {
  position : {
    latitude : number,
    longitude: number
  }
}
export default function OrphanageData() {

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  const navigation = useNavigation();

  const route = useRoute();
  const params = route.params as ParamProps;

  function handleCreate(){
    const data = new FormData()

    data.append("name", name);
    data.append("latitude", String(params.position.latitude));
    data.append("longitude", String(params.position.longitude));
    data.append("about", about);
    data.append("instructions", instructions);
    data.append("opening_hours", openingHours);
    data.append("open_on_weekend", String(openOnWeekends))
    
    images.forEach((image, index) => data.append("images", {
      name : `image_${index}.jpg`,
      type : 'image/jpg',
      uri : image
    } as any));

    api.post("/orphanages", data).then(res =>{

      
      navigation.navigate('OrphanagesMap')

    }).catch(err =>{

      

    })
  }

  async function handleSelectImages(){
    const {status} = await ImagePiker.requestCameraRollPermissionsAsync();

    if(status !== 'granted') {
      alert('Precisamos de acesso às suas fotos...');
    }

    const result = await ImagePiker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes : ImagePiker.MediaTypeOptions.Images
    })

    if(result.cancelled){
      return;
    }

    const {uri : image} = result;
    setImages([...images, image])
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => {setName(text)}}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={(text) => {setAbout(text)}}
      />

      {/*<Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
  />*/}

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
          {images.map(image => {
            return (
              <Image
                key={image}
                source={{uri : image}}
                style={styles.uploadedImage}
              />
            )
          })}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={(text) => {setInstructions(text)}}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={openingHours}
        onChangeText={setOpeningHours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={openOnWeekends}
          onValueChange={setOpenOnWeekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreate}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  uploadedImagesContainer : {
    flexDirection: 'row'
  },

  uploadedImage : {
    width : 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})