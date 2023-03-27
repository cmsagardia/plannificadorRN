
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import ControlPresupuesto from "./src/components/ControlPresupuesto";
import Filtro from "./src/components/Filtro";
import FormularioGasto from "./src/components/FormularioGasto";
import Header from "./src/components/Header";
import ListadoGastos from "./src/components/ListadoGastos";
import NuevoPresupuesto from "./src/components/NuevoPresupuesto";
import { generarId } from "./src/helpers";

const App = () => {

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [presupuesto, setPresupuesto] = useState(0)
  const [gastos, setGastos] = useState([])
  const [modal, setModal] = useState(false)
  const [gasto, setGasto] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto') ?? 0

        if (presupuestoStorage > 0) {
          setPresupuesto(presupuestoStorage)
          setIsValidPresupuesto(true)
        }
        console.log(presupuestoStorage)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerPresupuestoStorage()
  }, [])
  

  useEffect(() => {
    if (isValidPresupuesto) {
      const guardarPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem('planificador_presupuesto', presupuesto)
        } catch (error) {
          console.log(error)
        }
      }
      guardarPresupuestoStorage()
    } 
    
  }, [isValidPresupuesto])
  
  

  useEffect(() => {
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage = await AsyncStorage.getItem('planificador_gastos') 
        console.log(gastos)
        setGastos( gastosStorage ? JSON.parse(gastosStorage) : [])
      } catch (error) {
        console.log(error)
      }
    }
    obtenerGastosStorage()
  }, [])
 
  

  useEffect(() => {
    const guardarGastosStorage = async () => {
      try {
        await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos))
      } catch (error) {
        console.log(error)
      }
    }
    guardarGastosStorage()
  }, [gastos])



  const handleNuevoPresupuesto = (presupuesto) => {
    if(Number(presupuesto) > 0){
      setIsValidPresupuesto(true)
    }else{
      Alert.alert('Error', 'El presupuesto debe ser mayor a 0 y debe ser únicamente numerico', 
      [{text: 'Cancelar', style: 'cancel'}, {text: 'Continuar'}]
      /*La linea 13 es obligatoria en android */
      )
    }    
  }

  const handleGasto = gasto => {
    if([gasto.categoria, gasto.nombre, gasto.cantidad].includes('')){
        Alert.alert(
          'Error', 
          'Hay al menos un campo vacio', 
        [{text: 'Ok', style: 'cancel'}]
        )
        return 
    }

    if (gasto.id) {
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
    }else{
      //añadir el nuevo gasto al state
      gasto.id = generarId()
      gasto.fecha=Date.now()
      setGastos([...gastos, gasto])
      }
    setModal(!modal)//cierro el modal una vez que agrego el gasto
    }

  const eliminarGasto = id => {
    Alert.alert(
      'Eliminar', 
      '¿Desea aliminar este gasto?', 
    [
      {text: 'No', style: 'cancel'},
      {text: 'Si, Eliminar', onPress: () => {
        const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id)
        setGastos(gastosActualizados)
        setModal(!modal)
        setGasto({})
      }}
    ]
    )
  }  

  const resetearApp = () => {
    Alert.alert(
      'Resetear App', 
      '¿Desea resetear presupuesto y gastos?', 
      [
        {text: 'No', style: 'cancel'},
        {text: 'Si, Eliminar', onPress: async () => {
          try {
            await AsyncStorage.clear()
            setIsValidPresupuesto(false)
            setPresupuesto(0)
            setGastos([])
          } catch (error) {
            console.log(error)
          }
        }}
      ]
    )
  }

  return (

      <View style={styles.contenedor}>
        <ScrollView>
          <View style={styles.header}>        
            <Header/>
            {isValidPresupuesto ? (
              <ControlPresupuesto
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                gastos={gastos}
                resetearApp={resetearApp}
              />
            ) : (
            <NuevoPresupuesto
              handleNuevoPresupuesto={handleNuevoPresupuesto}//Valida el presupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
            />
            )}
          </View>

          {isValidPresupuesto && (
            <>
              <Filtro
                setFiltro={setFiltro}
                filtro={filtro}
                gastos={gastos}
                setGastosFiltrados={setGastosFiltrados}
              />
              <ListadoGastos
                gastos={gastos}
                setModal={setModal}
                setGasto={setGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />
            </>
          )}
        </ScrollView>

        {modal && (//return implicito para tener a modal como componente
          <Modal
            animationType="slide"
            visible={modal}
          >
            <FormularioGasto
              setModal={setModal}
              handleGasto={handleGasto}
              gasto={gasto}
              setGasto={setGasto}
              eliminarGasto={eliminarGasto}
            />
          </Modal>
        )}    

        {isValidPresupuesto && (      
          <Pressable
            style={styles.pressable}
            onPress={() => setModal(!modal)}  
          >
          <Image
            style={styles.imagen}
            source={require('./src/img/nuevo-gasto.png')}
            />
          </Pressable>                
        )}      
      </View>
  );
};

const styles = StyleSheet.create({
  colorTexto: {
    color: '#000'
  },
  contenedor: {
    backgroundColor: '#F5F5F5',
    flex: 1
  },
  header:{
    backgroundColor: '#3B82F6',
    minHeight: 450 
  },
  pressable: {
    position: 'absolute',
    bottom: 40,
    right: 30
  },
  imagen: {
    width: 60,
    height: 60
  }
});

export default App;
