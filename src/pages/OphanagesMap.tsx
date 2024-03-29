import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useState } from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import { Feather } from '@expo/vector-icons'
import OrphanageType from '../types/OrphanageType';
import { RectButton } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import api from '../services/api';
import mapMarker from '../images/map-marker.png';

export default function OrphanagesMap () {

    const navigation = useNavigation();
    const [orphanages, setOrphanages]  = useState<OrphanageType[]>([]);
    useFocusEffect(() => {
        api.get('/orphanages').then((res)=>{
            setOrphanages(res.data);
        }).catch((err) => {
            
        })
        
    })
    
    function handleNavigateOrphanage (id : number){
        navigation.navigate('Orphanage', {id});
    }

    function handleNavigateCreateOrphanage (){
        navigation.navigate('SelectMapPosition');
    }

    return (
        <View style={styles.container}>
        <StatusBar style="auto" />
        <MapView 
            provider={PROVIDER_GOOGLE}
            style={styles.mapStyle} 
            initialRegion={{
            latitude : -7.232141,
            longitude : -35.8884715,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008

            }} 
        >
            {orphanages.map((orphanage) =>{
                return (
                    <Marker
                        key={orphanage.id} 
                        icon={mapMarker}
                        calloutAnchor={{
                            x: 2.7,
                            y: 0.8
                        }}
                        coordinate={{
                            latitude : orphanage.latitude,
                            longitude : orphanage.longitude,
                        }}
                        >
                    <Callout tooltip onPress={() => handleNavigateOrphanage(orphanage.id)}>
                        <View style={styles.calloutContainer}>
                        <Text style={styles.calloutText}>{orphanage.name}</Text>
                        </View>
                    </Callout>
                    </Marker>
                )
            })}
        </MapView>
        <View style={styles.footer}>
            <Text style={styles.footerText}> {orphanages.length} orfanatos encontrados</Text>
            <RectButton style={styles.createOrphanageButton} onPress={handleNavigateCreateOrphanage}>
            <Feather name="plus" size={20} color="#FFF" />
            </RectButton>
        </View>
        </View>
    );
}
    
const styles = StyleSheet.create({
    container: {
    flex: 1,
    },
    mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    },
    calloutContainer : {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    },
    calloutText : {
    color: "#0089a5",
    fontSize: 14,
    fontFamily: 'Nunito_700Bold'
    },
    footer : {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
    },
    footerText :{
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold'
    },
    createOrphanageButton : {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',

    }
});