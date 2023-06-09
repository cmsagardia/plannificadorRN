import { Picker } from '@react-native-picker/picker'
import React, { useEffect, useState } from 'react'
import {Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import globalStyles from '../styles'

const FormularioGasto = ({setModal, handleGasto, setGasto, gasto, eliminarGasto}) => {

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')

    useEffect(() => {
        if (gasto?.nombre) {
            setNombre(gasto.nombre)
            setCantidad(gasto.cantidad)
            setCategoria(gasto.categoria)
            setId(gasto.id)
            setFecha(gasto.fecha)
        }

    }, [gasto])
    

    return (
    <SafeAreaView style={styles.contenedor}>
        <View style={styles.contenedorBotones}>
            <Pressable                 
                onLongPress={()=> {
                    setModal(false)
                    setGasto({})
                }}
                style={[styles.btn, styles.btnCancelar]}
            >
                <Text style={styles.btnTexto}>Cancelar</Text> 
            </Pressable>

            {!!id && ( //si no hay nada dentro de id, aparce el boton eliminar               
                <Pressable   
                    onLongPress={()=> { eliminarGasto(gasto.id)
                        // setModal(false)
                        // setGasto({})
                    }}                
                    style={[styles.btn, styles.btnEliminar]}
                >
                    <Text style={styles.btnTexto}>Eliminar</Text> 
                </Pressable>
            )}

            
        </View>

        <View style={styles.formulario}>
            <Text style={styles.titulo}>{gasto?.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</Text>
            <View style={styles.campo}>
                <Text style={styles.label}>Nombre Gasto</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#808080"
                    placeholder='Nombre del Gasto. ej. Comida'
                    value={nombre}
                    onChangeText={setNombre}
                />
            </View>
            <View style={styles.campo}>
                <Text style={styles.label}>Cantidad Gasto</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#808080"
                    placeholder='Cantidad del Gasto. ej. 300'
                    keyboardType='numeric'
                    value={cantidad}
                    onChangeText={setCantidad}
                />
            </View>
            <View style={styles.campo}>
                <Text style={styles.label}>Categoria Gasto</Text>
                <Picker 
                    selectedValue={categoria}
                    onValueChange={(itemValue)=>{setCategoria(itemValue)}}
                    style={[styles.input, styles.options]}
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
            <Pressable 
                style={styles.submitBtn}
                onPress={()=> handleGasto({nombre, cantidad, categoria, id, fecha})}
            >
                <Text style={styles.submitBtnTexto}>{gasto?.nombre ? 'Guardar Cambios Gasto' : 'Agregar Gasto'}</Text>
            </Pressable>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    colorTexto: {
      color: '#000'
    },
    contenedor: {
        backgroundColor: '#1D40AF',
        flex: 1
    },
    contenedorBotones:{
        flexDirection: 'row',
        justifyContent: 'space-between'  
    },
    btn: {
        padding: 15,
        marginTop: 40,
        marginBottom: -18,
        marginHorizontal: 10,
        borderRadius: 10,
        flex: 1
    },
    btnCancelar: {
        backgroundColor: '#DB2777'
    },
    btnEliminar: {
        backgroundColor: '#03BADB',
    },
    btnTexto: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF'

    },
    formulario: {
        ...globalStyles.contenedor
    },
    titulo: {
        textAlign: 'center',
        fontSize: 28,
        marginBottom: 30,
        color: '#64748B'
    },
    campo: {
        marginVertical: 10,
        color: '#64748B',
    },
    label: {
        color: '#64748B',
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold',
        
    }, 
    input: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        color: '#000'
    },
    submitBtn: {
        backgroundColor: '#3B82F6',
        padding: 10,
        marginTop: 20,
        borderRadius: 10
    },
    submitBtnTexto: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        
    },
    options: {
        color: '#808080'
    }

})    

export default FormularioGasto
