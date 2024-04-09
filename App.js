import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.normalContainer}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
        <View style={styles.weatherToday}>
          <Text style={styles.tempToday}>27</Text>
          <Text style={styles.descToday}>Sunny</Text>
        </View>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.tempWeek}>19</Text>
          <Text style={styles.descWeek}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.tempWeek}>10</Text>
          <Text style={styles.descWeek}>Cloudy</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  normalContainer: {
    flex: 1,
    backgroundColor: 'rgba(60, 113, 168, 0.8)',
  },
  //장소
  city: {
    flex: 1.3,
    marginTop: 90,
    alignItems: 'center',
  },
  cityName: {
    color: 'white',
    fontSize: 40,
  },
  //오늘의 기온 및 설명
  weatherToday: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempToday: {
    color: 'white',
    fontSize: 75,
  },
  descToday: {
    color: 'white',
    fontSize: 25,
  },
  //주차별 날씨
  weather: {
    flex: 3,
    backgroundColor: 'rgba(39, 111, 187, 0.8)',
    margin: 20,
    borderRadius: 10,
    flexDirection: 'row',
  },
  day: {
    margin: 20,
    flexDirection: 'col',
    alignItems: 'center',
  },
  tempWeek: {
    color: 'white',
    fontSize: 10,
  },
  descWeek: {
    color: 'white',
    fontSize: 10,
  },
});
