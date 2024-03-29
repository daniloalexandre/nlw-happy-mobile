import { StyleSheet, Text, View } from 'react-native';

import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps{
    title: string
    showCancel ?: boolean
}
export default function Header( {title, showCancel = true} : HeaderProps){
    const navigation = useNavigation()
    function handleNavigateBack(){
        navigation.canGoBack() && navigation.goBack()
    }
    function handleNavigateClose(){
        navigation.navigate("OrphanagesMap")
    }

    return (
        <View style={styles.container}>
            <BorderlessButton>
                <Feather name="arrow-left" size={24} color="#15b6d6" onPress={handleNavigateBack} />
            </BorderlessButton>
            <Text style={styles.title}>{title}</Text>
            {showCancel ? <BorderlessButton>
                <Feather name="x" size={24} color="#ff669c" onPress={handleNavigateClose} />
            </BorderlessButton> : 
            <View/>}
        </View>
    )

}

const styles = StyleSheet.create({
    container : {
        padding: 24,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        paddingTop: 44,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title : {
        fontFamily: 'Nunito_600SemiBold',
        color: '#8fa7b3',
        fontSize: 16,
    }
})