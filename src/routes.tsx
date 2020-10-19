import Header from './components/Header';
import { NavigationContainer } from '@react-navigation/native';
import Orphanage from './pages/Orphanage';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import OrphanagesMap from './pages/OphanagesMap';
import React from 'react'
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import { createStackNavigator } from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{
                headerShown : false,
                cardStyle : {
                    backgroundColor : '#f2f3f5'
                }
            }}>
                <Screen 
                    name="OrphanagesMap" 
                    component={OrphanagesMap}/>
                <Screen 
                    name="Orphanage" 
                    component={Orphanage}
                    options={{
                        headerShown : true,
                        header : () => <Header showCancel={false} title="Orfanato" />
                    }}/>

                <Screen 
                    name="SelectMapPosition" 
                    component={SelectMapPosition}
                    options={{
                        headerShown : true,
                        header : () => <Header title="Seleciona no Mapa" />
                    }}/>
                <Screen 
                    name="OrphanageData" 
                    component={OrphanageData}
                    options={{
                        headerShown : true,
                        header : () => <Header title="Informe os Dados" />
                    }}/>        
            </Navigator>
        </NavigationContainer>
    )
}