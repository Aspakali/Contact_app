import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setContacts(mockContacts);
    setFilteredContacts(mockContacts);
  }, []);

  const addContact = () => {
    if (name.trim() !== '' && phoneNumber.trim() !== '') {
      const newContact = {
        id: Date.now().toString(),
        name,
        phoneNumber,
      };
      setContacts([...contacts, newContact]);
      setName('');
      setPhoneNumber('');
    }
  };

  const filterContacts = (searchText) => {
    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
        contact.phoneNumber.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  const openContactDetails = (contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <TouchableOpacity style={styles.button} onPress={addContact}>
          <Text style={styles.buttonText}>Add Contact</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          filterContacts(text);
        }}
      />
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openContactDetails(item)} style={styles.contactItem}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text>{item.phoneNumber}</Text>
          </TouchableOpacity>
        )}
      />
      <Modal animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{selectedContact?.name}</Text>
            <Text style={styles.modalText}>{selectedContact?.phoneNumber}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#9fa6ab',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#6623b8',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
    margin: 'auto',
    display: 'block',
    position: 'relative',
  },
  contactItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
});

const mockContacts = [
  {
    id: '1',
    name: 'Aksha',
    phoneNumber: '1234567890',
  },
  {
    id: '2',
    name: 'Rehan',
    phoneNumber: '9876543210',
  },
  {
    id: '3',
    name: 'Asik',
    phoneNumber: '4567891230',
  },
  {
    id: '4',
    name: 'Sk Aspak Ali',
    phoneNumber: '89898988'
  },
];