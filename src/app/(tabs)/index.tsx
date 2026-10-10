import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library/legacy';
import { useEffect, useRef, useState } from 'react';
import { ImageSourcePropType, View, StyleSheet, Platform, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';
import domtoimage from 'dom-to-image';
import { Image } from 'expo-image';

import Button from '@/components/button';
import ImageViewer from '@/components/image-viewer';
import IconButton from '@/components/icon-button';
import CircleButton from '@/components/circle-button';
import EmojiPicker from '@/components/emoji-picker';
import EmojiList from '@/components/emoji-list';
import EmojiSticker from '@/components/emoji-sticker';
import epnTheme from '@/constants/epn-theme.json';

const PlaceholderImage = require('@/assets/images/background-image.png');
const EpnLogo = require('@/assets/images/logo-epn-vertical.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);
  const [permissionResponse, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const imageRef = useRef<View>(null);

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, []);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert('Saved!');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.brandHeader}>
        <Image
          source={EpnLogo}
          style={styles.brandLogo}
          contentFit="contain"
          accessibilityLabel="Escudo de la Escuela Politécnica Nacional"
        />
        <View style={styles.brandCopy}>
          <Text style={styles.brandEyebrow}>ESCUELA POLITÉCNICA NACIONAL</Text>
          <Text style={styles.brandTitle}>PROYECTO EPN DISEÑO DEL LOGOTIPO</Text>
        </View>
        <View style={styles.brandAccent} />
      </View>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false} style={styles.previewFrame}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reiniciar" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Guardar" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Elegir una foto" onPress={pickImageAsync} />
          <Button label="Usar esta foto" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: epnTheme.colors.cream,
  },
  brandHeader: {
    minHeight: 86,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: epnTheme.colors.navy,
    borderBottomWidth: 3,
    borderBottomColor: epnTheme.colors.red,
  },
  brandLogo: {
    width: 54,
    height: 54,
    marginRight: 14,
  },
  brandCopy: {
    flex: 1,
  },
  brandEyebrow: {
    color: epnTheme.colors.cream,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  brandTitle: {
    color: epnTheme.colors.gold,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 3,
  },
  brandAccent: {
    width: 8,
    height: 34,
    borderRadius: 4,
    backgroundColor: epnTheme.colors.gold,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  previewFrame: {
    width: '100%',
    maxWidth: 320,
  },
  footerContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 22,
    gap: 10,
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    backgroundColor: epnTheme.colors.navy,
    borderColor: epnTheme.colors.gold,
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 22,
  },
});
