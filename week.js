import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, Alert, Image, ActivityIndicator } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
export default function Week({ icon, tempmax, tempmin, date }) {
  return (
    <View style={styles.day}>
      <Text style={styles.dayWeek}>{date.substring(0, 3)}</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
        style={{ width: 30, height: 30, zIndex: 0, flex: 0.15, marginLeft: -40 }}
        onError={(e) => console.log('Image load failed:', e.nativeEvent.error)}
      />
      <Text style={styles.tempminWeek}>{tempmin}°C</Text>
      <Text style={styles.tempmaxWeek}>{tempmax}°C</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  //주차별 날씨

  day: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
  },
  dayWeek: {
    color: 'white',
    fontSize: 20,
    flex: 0.2, // This will make the date expand
  },
  tempminWeek: {
    color: 'white',
    fontSize: 15,
    flex: 0.2,
    textAlign: 'center',
  },
  tempmaxWeek: {
    color: 'white',
    fontSize: 15,
    flex: 0.2,
    textAlign: 'center',
  },
});
