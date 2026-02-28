import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Colors } from '../constants/Colors';

interface CustomInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  isDropdown?: boolean;
  options?: string[];
  onSelect?: (option: string) => void;
}

export default function CustomInput({
  label,
  placeholder,
  value,
  onChangeText,
  isDropdown,
  options = [],
  onSelect
}: CustomInputProps) {
  const [modalVisible, setModalVisible] = useState(false);

  // --- RENDERS A DROPDOWN MODAL ---
  if (isDropdown) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={value ? styles.inputText : styles.placeholderText}>
            {value || placeholder}
          </Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select {label}</Text>
              <FlatList
                data={options}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => {
                      if (onSelect) onSelect(item);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.optionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // --- RENDERS A STANDARD TEXT INPUT ---
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.inputContainer}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary, marginBottom: 8 },
  inputContainer: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
  },
  inputText: { color: Colors.textPrimary, fontSize: 16 },
  placeholderText: { color: Colors.textSecondary, fontSize: 16 },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 19, 43, 0.5)', // Navy blue with opacity
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 16 },
  optionItem: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: Colors.border },
  optionText: { fontSize: 16, color: Colors.textPrimary },
  closeButton: {
    marginTop: 24,
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: { fontSize: 16, fontWeight: 'bold', color: Colors.textPrimary },
});