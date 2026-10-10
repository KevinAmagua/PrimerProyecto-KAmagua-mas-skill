import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import epnTheme from '@/constants/epn-theme.json';

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
};

export default function IconButton({ icon, label, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.iconButton,
        pressed && styles.iconButtonPressed,
      ]}
      onPress={onPress}
    >
      <MaterialIcons name={icon} size={24} color={epnTheme.colors.cream} />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 48,
    minHeight: 48,
  },
  iconButtonPressed: {
    opacity: 0.75,
  },
  iconButtonLabel: {
    color: epnTheme.colors.cream,
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
  },
});
