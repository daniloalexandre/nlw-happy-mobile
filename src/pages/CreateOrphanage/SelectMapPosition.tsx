import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import React, { useState } from 'react';

import { RectButton } from 'react-native-gesture-handler';
import mapMarkerImg from '../../images/map-marker.png';
import { useNavigation } from '@react-navigation/native';

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState({latitude : 0, longitude : 0 })

  function handleNextStep() {
    navigation.navigate('OrphanageData', {position});
  }

  function handleSelectPosition(event : MapEvent){
    setPosition(event.nativeEvent.coordinate)
  }

  return (
    <View style={styles.container}>
      <MapView 
        initialRegion={{
          latitude : -7.232141,
          longitude : -35.8884715,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectPosition}
      >
        {position.latitude != 0 && position.longitude != 0 && <Marker 
          icon={mapMarkerImg}
          coordinate={{ latitude: position.latitude, longitude: position.longitude }}
        />}
      </MapView>

      {position.latitude != 0 && position.longitude != 0 && <RectButton style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})