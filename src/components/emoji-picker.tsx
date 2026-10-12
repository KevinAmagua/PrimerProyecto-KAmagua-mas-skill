import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import epnTheme from '@/constants/epn-theme.json';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function EmojiPicker({ isVisible, children, onClose }: Props) {
  return (
    <View>
      {/* Modal nativo para mostrar el selector sin cambiar de pantalla. */}
      <Modal
        animationType="slide"
        transparent
        visible={isVisible}
        onRequestClose={onClose}
      >
        {/* Tocar el fondo o el botón de cierre notifica al componente padre. */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cerrar selector de stickers"
          style={styles.backdrop}
          onPress={onClose}
        />
        <View style={styles.modalContent}>
          <View style={styles.handle} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Elige un sticker</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Cerrar"
              style={styles.closeButton}
              onPress={onClose}
            >
              <MaterialIcons
                name="close"
                color={epnTheme.colors.cream}
                size={22}
              />
            </Pressable>
          </View>
          {children}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(20, 38, 75, 0.45)',
  },
  modalContent: {
    minHeight: 210,
    width: '100%',
    backgroundColor: epnTheme.colors.navy,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
    paddingBottom: 12,
  },
  handle: {
    alignSelf: 'center',
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: epnTheme.colors.gold,
    marginTop: 10,
  },
  titleContainer: {
    minHeight: 52,
    backgroundColor: epnTheme.colors.red,
    marginTop: 10,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: epnTheme.colors.cream,
    fontSize: 16,
    fontWeight: '700',
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
