import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const BuddyDropdown = ({ data, onSelect, placeholder = "Select an option", itemSelected,setItemSelected }) => {
    const [open, setOpen] = useState(false)
    return (
        <View style= {{marginVertical: 8}}>
            <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
                <Text>{itemSelected || placeholder}</Text>
            </TouchableOpacity>
            <Modal visible={open} transparent animationType="fade">
                <TouchableOpacity style={styles.backdrop} onPress={() => setOpen(false)}>
                    <View style={styles.listBox}>
                        <FlatList data={data} keyExtractor={item => item.value} renderItem={({ item }) => (
                            <TouchableOpacity style={styles.item} onPress={() => {
                                onSelect(item.value)
                                setItemSelected(item.value)
                                setOpen(false)
                            }}>
                                <Text>{item.label}</Text>
                            </TouchableOpacity>
                        )} />
                    </View>


                </TouchableOpacity>
            </Modal>
        </View >
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#ffffffb7'
    },
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)"
    },
    listBox: {
        position: 'absolute',
        top: '30%',
        left: '10%',
        right: '10%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        maxHeight: '40%'
    },
    item: {
        padding: 12,
        borderBottomWidth: StyleSheet.hairlineWidth
    }

})

export default BuddyDropdown