import { Picker } from '@react-native-picker/picker'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import globalStyles from '../styles'


const Filtro = ({setFiltro, filtro, gastos, setGastosFiltrados}) => {

useEffect(() => {
  if (filtro === '') {
    setGastosFiltrados([])
  } else {
    const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
    setGastosFiltrados(gastosFiltrados)
  }
    

}, [filtro])


  return (
    <View style={styles.contenedor}>
        <Text style={styles.label}>Desde Filtro</Text>

        <Picker 
            style={[styles.input, styles.options]}
            selectedValue={filtro}
            onValueChange={(valor)=>{
                setFiltro(valor)
            }}
        > 
            <Picker.Item label='--Seleccione --' value=''/>
            <Picker.Item label='Ahorro' value='ahorro'/>
            <Picker.Item label='Comida' value='comida'/>
            <Picker.Item label='Casa' value='casa'/>
            <Picker.Item label='Gastos Varios' value='gastos'/>
            <Picker.Item label='Ocio' value='ocio'/>
            <Picker.Item label='Salud' value='salud'/>
            <Picker.Item label='Suscripciones' value='suscripciones'/>
        </Picker>
    </View>
  )
}



const styles = StyleSheet.create({

    contenedor: {
        ...globalStyles.contenedor,
        transform: [{translateY: 0}],
        marginTop: 80
    },
    label: {
        color: '#64748B',
        fontSize: 22,
        fontWeight: '900',

    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        color: '#000'
    },
    options: {
        color: '#808080'
    }
})



export default Filtro
