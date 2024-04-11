import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, Alert, Image, ActivityIndicator } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Day({ icon, temp, tempmax, tempmin, description, date }) {
  return (
    <View style={styles.weatherToday}>
      <Text style={styles.Today}>{date}</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
        style={{ width: 120, height: 120, zIndex: 0 }}
        onError={(e) => console.log('Image load failed:', e.nativeEvent.error)}
      />
      <Text style={styles.tempToday}>{temp}°C</Text>
      <Text style={styles.descToday}>{description}</Text>
      <Text style={styles.highandlowToday}>
        최고기온: {tempmax}°C | 최저기온: {tempmin}°C
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  //오늘의 기온 및 설명
  weatherToday: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: SCREEN_WIDTH,
  },
  Today: {
    marginTop: 10,
    color: 'white',
    fontSize: 20,
    marginBottom: -20,
  },
  tempToday: {
    color: 'white',
    fontSize: 55,
    marginTop: -25,
  },
  descToday: {
    color: 'white',
    fontSize: 25,
  },
  highandlowToday: {
    color: 'white',
    fontSize: 15,
    marginTop: 10,
  },
});
