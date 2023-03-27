import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import globalStyles from '../styles'
const NuevoPresupuesto = ({handleNuevoPresupuesto, presupuesto, setPresupuesto}) => {  

  return (
    <View style={styles.contenedor}>
      <Text style={[styles.label]}>Definir Presupuesto</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Ej 300'  
        placeholderTextColor="#808080"       
        value={presupuesto.toString()}
        onChangeText={setPresupuesto}
        multiline={true}
      />
      <Pressable 
        style={styles.boton}
        onPress={()=> handleNuevoPresupuesto(presupuesto)}
      >
        <Text style={[styles.colorTexto, styles.botonTexto]}>Agregar Presupuesto</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    colorTexto: {
      color: '#000'
    },
    contenedor: {
      ...globalStyles.contenedor
    },
    label: {
        textAlign: 'center',
        fontSize: 24,
        color: '#3B82F6'

    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 30,
        color: '#000'
    },
    boton: {
        marginTop: 30,
        backgroundColor:'#1048A4',
        padding: 10,
        borderRadius: 10,
        color: '#000'
    },
    botonTexto: {
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
  });

export default NuevoPresupuesto
