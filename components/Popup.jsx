import { View, Text, Modal, Button, StyleSheet } from 'react-native'
import React from 'react'

export default function Popup({ visible, onClose, child }) {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{child}</Text>
        <Button title="Close" onPress={onClose} />
      </View>
    </View>
  </Modal>
  )
}


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
      margin: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 8,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });