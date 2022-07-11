/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import Clipboard from '@react-native-community/clipboard';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(true);
  const [gifs, setGifs] = useState([]);
  const [copiedText, setCopiedText] = useState('');

  const getGifs = async () => {
    try {
      const res = await fetch(
        'https://api.giphy.com/v1/gifs/trending?api_key=syYI4LsRKrJYK0riTMUfhYlLVSiGlOk2&limit=25',
      );
      const json = await res.json();
      setGifs(json.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = url => {
    Clipboard.setString(url);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  useEffect(() => {
    getGifs();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Button title="Paste" onPress={fetchCopiedText} />
      <Text style={{fontSize: 18, color: 'black'}}>{copiedText}</Text>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {gifs.map(gif => (
          <TouchableOpacity
            style={{
              margin: 4,
            }}
            key={gif.id}
            onPress={() => copyToClipboard(gif.images.original.url)}>
            <Image
              key={gif.id}
              style={{
                height: 400,
                width: Dimensions.get('window').width - 8,
              }}
              source={{uri: gif.images.original.url}}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
