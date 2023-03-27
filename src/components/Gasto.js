import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { formatearCantidad, formatearFecha } from '../helpers'
import globalStyles from '../styles'

const Gasto = ({gasto, setModal, setGasto}) => {

    const {nombre, cantidad, categoria, id, fecha} = gasto

    const diccionarioIconos = {
        ahorro: require('../img/icono_ahorro.png'),
        comida: require('../img/icono_comida.png'),
        casa: require('../img/icono_casa.png'),
        gastos: require('../img/icono_gastos.png'),
        ocio: require('../img/icono_ocio.png'),
        salud: require('../img/icono_salud.png'),
        suscripciones: require('../img/icono_suscripciones.png')
    }

    const handleAcciones = () => {
        setModal(true)
        setGasto(gasto)
    } 

  return (
    <Pressable
        onLongPress={handleAcciones}
    >
        <View style={styles.contenedor}>
            <View style={styles.contenido}>
                <View style={styles.contenedorImagen}>
                    <Image
                        style={styles.imagen}
                        source={diccionarioIconos[categoria]}
                    />
                    <View styles={[styles.texto, styles.contenedorTexto]}>
                        <Text style={[styles.texto, styles.categoria]}>{categoria}</Text>
                        <Text style={[styles.texto, styles.nombre]}>{nombre}</Text>
                        <Text style={[styles.texto, styles.fecha]}>{formatearFecha(fecha)}</Text>
                    </View>
                </View>
                <Text style={[styles.texto, styles.cantidad]}>{formatearCantidad(cantidad)}</Text>
            </View>      
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    texto: {
        color: '#000'
    },
    contenedor: {
        ...globalStyles.contenedor,
        marginBottom: 20
    },
    contenido: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contenedorImagen: {
        flexDirection: 'row',
        alignItems: 'center',
        felx: 1
    },
    imagen: {
        width: 80,
        height: 80,
        marginRight: 20
    },
    contenedorTexto: {
        flex: 1
    },
    categoria: {
        color: '#94A3B8',
        fontSize: 16,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 5
    }, 
    nombre: {
        fontSize: 22,
        color: '#64748B',
        marginBottom: 5
    },
    cantidad: {
        fontSize: 20,
        fontWeight: '700'
    },
    fecha: {
        fontWeight: '700',
        color: '#DB2777'
    }

})

export default Gasto
