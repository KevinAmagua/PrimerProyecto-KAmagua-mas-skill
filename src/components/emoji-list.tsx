import { ImageSourcePropType, StyleSheet, FlatList, Platform, Pressable, View } from 'react-native';
import { Image } from 'expo-image';
import epnTheme from '@/constants/epn-theme.json';

type Props = {
  onSelect: (image: ImageSourcePropType) => void;
  onCloseModal: () => void;
};

export default function EmojiList({ onSelect, onCloseModal }: Props) {
  // Los stickers son recursos locales incluidos con la aplicación.
  const emoji: ImageSourcePropType[] = [
    require("@/assets/images/emoji1.png"),
    require("@/assets/images/emoji2.png"),
    require("@/assets/images/emoji3.png"),
    require("@/assets/images/emoji4.png"),
    require("@/assets/images/emoji5.png"),
    require("@/assets/images/emoji6.png"),
  ];

  // FlatList representa los recursos como una lista horizontal desplazable.
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emoji}
      keyExtractor={(_, index) => `sticker-${index}`}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Elegir sticker ${index + 1}`}
          style={({ pressed }) => [
            styles.stickerOption,
            pressed && styles.stickerOptionPressed,
          ]}
          onPress={() => {
            // Informa qué sticker se eligió y cierra el selector.
            onSelect(item);
            onCloseModal();
          }}>
          <View style={styles.stickerFrame}>
            <Image source={item} style={styles.image} contentFit="contain" />
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stickerOption: {
    width: 84,
    height: 84,
    borderRadius: 18,
    padding: 6,
    backgroundColor: epnTheme.colors.white,
    borderWidth: 2,
    borderColor: epnTheme.colors.gold,
  },
  stickerOptionPressed: {
    opacity: 0.75,
    borderColor: epnTheme.colors.red,
  },
  stickerFrame: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
