import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import * as Location from 'expo-location';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef();
  const [location, setLocation] = useState();
  const [permissionStatus, setPermissionStatus] = useState(true);
  const [city, setCity] = useState('Loading...');
  // 스크롤 이벤트 핸들러
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.floor(scrollPosition / SCREEN_WIDTH); // SCREEN_WIDTH를 사용
    setCurrentPage(pageIndex);
  };

  // 페이지 인디케이터 렌더링 함수
  const renderPagination = () => {
    const indicators = [];
    const numPages = 2; // 스크롤 뷰 안의 페이지 수

    for (let i = 0; i < numPages; i++) {
      indicators.push(<View key={i} style={[styles.dot, currentPage === i && styles.activeDot]} />);
    }

    return <View style={styles.paginationContainer}>{indicators}</View>;
  };

  //requestForegroundPermissionAsync()의 return 형식은  {"canAskAgain": true, "expires": "never", "granted": true, "status": "granted"}
  const askForLocationPermission = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      // 권한이 거부되었을 때
      Alert.alert(
        'Permission needed',
        'This app needs location permission Please allow permission in your settings for this weather App',
        [{ text: 'Cancel', style: 'cancel' }]
      );
    } else {
      setPermissionStatus(true); // 권한 상태 업데이트
    }
    //getCurrentPositionAsync()의 return 형식은
    //{"coords": {"accuracy": 35, "altitude": 27.172813415527344, "altitudeAccuracy": 16.900047302246094, "heading": -1,
    //"latitude": 37.56097280419063, "longitude": 127.06319620266265, "speed": -1}, "timestamp": 1712650449426.6128}
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 6 });
    //[{"city": "서울특별시", "country": "대한민국", "district": "용답동", "isoCountryCode": "KR",
    //"name": "자동차시장1길 49", "postalCode": "04808", "region": "서울특별시", "street": "자동차시장1길", "streetNumber": "49",
    // "subregion": null, "timezone": "Asia/Seoul"}]

    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
    setCity(location[0].district);
  };

  useEffect(() => {
    askForLocationPermission();
  }, []);

  return (
    <View style={styles.normalContainer}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ref={scrollViewRef}
        >
          <View style={styles.weatherToday}>
            <Text style={styles.Today}>04/09</Text>
            <Text style={styles.tempToday}>27</Text>
            <Text style={styles.descToday}>Sunny</Text>
            <Text style={styles.highandlowToday}>Highest: 28 | Lowest: 23</Text>
          </View>
          <View style={styles.weatherToday}>
            <Text style={styles.Today}>04/10</Text>
            <Text style={styles.tempToday}>19</Text>
            <Text style={styles.descToday}>Sunny</Text>
            <Text style={styles.highandlowToday}>Highest: 23 | Lowest: 15</Text>
          </View>
        </ScrollView>
        {renderPagination()}
      </View>

      <ScrollView style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.dayWeek}>수</Text>
          <Text style={styles.descWeek}>Sunny ☀️</Text>
          <Text style={styles.tempWeek}>19</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.dayWeek}>목</Text>
          <Text style={styles.descWeek}>Cloudy ⛅</Text>
          <Text style={styles.tempWeek}>10</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // 기존 스타일 유지
  paginationContainer: {
    flexDirection: 'row',
    alignSelf: 'center', // 인디케이터를 중앙으로 정렬
    marginTop: 10,
  },
  dot: {
    height: 5,
    width: 5,
    backgroundColor: '#C4C4C5',
    borderRadius: 5,
    margin: 5,
  },
  activeDot: {
    backgroundColor: 'white',
  },
  normalContainer: {
    flex: 1,
    backgroundColor: 'rgba(60, 113, 168, 0.8)',
  },
  //장소
  city: {
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
    marginBottom: 10,
    width: SCREEN_WIDTH,
  },
  Today: {
    marginTop: 10,
    color: 'white',
    fontSize: 20,
  },
  tempToday: {
    color: 'white',
    fontSize: 70,
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
  //주차별 날씨
  weather: {
    backgroundColor: 'rgba(39, 111, 187, 0.8)',
    margin: 20,
    borderRadius: 10,
  },
  day: {
    margin: 20,
    flexDirection: 'row',
  },
  dayWeek: {
    color: 'white',
    fontSize: 20,
    marginRight: 30,
  },
  descWeek: {
    color: 'white',
    fontSize: 15,
    marginRight: 30,
  },
  tempWeek: {
    color: 'white',
    fontSize: 15,
  },
});
