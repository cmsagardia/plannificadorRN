import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Gasto from './Gasto'

const ListadoGastos = ({gastos, setModal, setGasto, filtro, gastosFiltrados}) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Gastos</Text>

      {filtro ? gastosFiltrados.map(gasto => (
        <Gasto
          key={gasto.id}
          gasto={gasto}
          setModal={setModal}
          setGasto={setGasto}
        />
      )) : gastos.map( gasto => (
        <Gasto
          key={gasto.id}
          gasto={gasto}
          setModal={setModal}
          setGasto={setGasto}
        />
      )) }

      {(gastos.length === 0 || (gastosFiltrados.length === 0 && !!filtro)) && (
        <Text style={styles.noGastos}>No hay Gastos</Text>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        marginTop: 40,
        marginBottom: 100
    },
    titulo: {
        color: '#34748B',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 20
    },
    noGastos: {
        color: '#000',
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 20
    }

})

export default ListadoGastos
