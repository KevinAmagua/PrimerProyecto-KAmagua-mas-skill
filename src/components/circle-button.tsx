import { View, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import epnTheme from '@/constants/epn-theme.json';

type Props = {
  onPress: () => void;
};

export default function CircleButton({ onPress }: Props) {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Agregar sticker"
        style={({ pressed }) => [
          styles.circleButton,
          pressed && styles.circleButtonPressed,
        ]}
        onPress={onPress}
      >
        <MaterialIcons name="add" size={38} color={epnTheme.colors.cream} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: epnTheme.colors.gold,
    borderRadius: 42,
    padding: 3,
  },
  circleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: epnTheme.colors.red,
  },
  circleButtonPressed: {
    opacity: 0.8,
  },
});
