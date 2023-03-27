import React, { useEffect, useState } from 'react'
import {Pressable, StyleSheet, Text, View } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { formatearCantidad } from '../helpers'
import globalStyles from '../styles'

const ControlPresupuesto = ({presupuesto, resetearApp, gastos}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto)=> Number(gasto.cantidad) + total, 0)
        

        const totalDisponible = presupuesto - totalGastado
        

        const nuevoPorcentaje = (
            ((presupuesto - totalDisponible) / presupuesto) * 100
        )
        
        
        setGastado(totalGastado)
        setDisponible(totalDisponible)
        setPorcentaje(nuevoPorcentaje)


    }, [gastos])

    
  return (
    
    <View style={styles.contenedor}>
     <View style={styles.centrarGrafica}>
        <CircularProgress
            value={porcentaje}
            duration={1000}
            radius={150}
            valueSuffix={'%'}
            title='Gastado'
            inActiveStrokeColor='#F5F5F5'
            inActiveStrokeWidth={20}
            activeStrokeColor='#3B82F6'
            activeStrokeWidth={20}
            titleStyle={{fontWeight: 'bold', fontSize: 20}}
            titleColor= '#64748B'
        />
     </View>

     <View style={styles.contenedorTexto}>   

        <Pressable
        onLongPress={resetearApp}
            style={styles.boton}
        >
            <Text style={styles.textoBoton}>Reiniciar App</Text>
        </Pressable>
            
        <Text style={styles.valor}>
            <Text style={styles.label}>Presupuesto: {''}</Text>
            <Text style={styles.input}>{formatearCantidad(presupuesto)}</Text> 
        </Text>
        <Text style={styles.valor}>
            <Text style={styles.label}>Disponible: {''}</Text>
            <Text style={styles.input}>{formatearCantidad(disponible)}</Text> 
        </Text>
        <Text style={styles.valor}>
            <Text style={styles.label}>Gastado: {''}</Text>
            <Text style={styles.input}>{formatearCantidad(gastado)}</Text> 
        </Text>
     </View>

            
    </View>
  )
}

const styles = StyleSheet.create({

    contenedor: {
        ...globalStyles.contenedor
    },
    centrarGrafica: {
        alignItems: 'center'
    },
    boton: {
        backgroundColor: '#DB2777',
        padding: 10, 
        marginBottom: 40,
        borderRadius: 5
    },
    textoBoton: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    contenedorTexto: {
        marginTop: 50
    },
    valor: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10
    },    
    label: {
        color: '#000',
        fontWeight: '700',
        color: '#3B82F6'
    },
    input: {
        color: '#000'
    }
})

export default ControlPresupuesto
