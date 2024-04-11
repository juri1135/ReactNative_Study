//-*-coding:utf-8-*-
import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, Alert, Image, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import Day from './day';
import Week from './week';
import { Fontisco } from '@expo/vector-icons';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function App() {
  //내 API를 aaplication에 두는 건 굉장히 위험한 행동! 어플리케이션 사용하는 사람들 중에 이 api key 알아낼 수 있는 사람 있을 수도
  // 실제로는 서버에 둬야 함
  const API_KEY = '57504f8e32d90bfb0fdf6b0757459b35';
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef();
  const [days, setDays] = useState([]);
  const [permissionStatus, setPermissionStatus] = useState(true);
  const [city, setCity] = useState('Loading...');
  // 스크롤 이벤트 핸들러
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.floor(scrollPosition / SCREEN_WIDTH); // SCREEN_WIDTH를 사용
    setCurrentPage(pageIndex);
  };
  //소수 첫 째 자리 반올림 함수
  function roundToTwo(num) {
    return Math.round(num * 10) / 10;
  }

  // 페이지 인디케이터 렌더링 함수
  const renderPagination = () => {
    const indicators = [];
    const numPages = days.length; // 스크롤 뷰 안의 페이지 수

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
    const { list } = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=kr&units=metric`
      )
    ).json();
    const filteredList = list.filter(({ dt_txt }) => dt_txt.endsWith('03:00:00'));
    setDays(filteredList);
  };

  useEffect(() => {
    askForLocationPermission();
  }, []);

  return (
    <View style={styles.normalContainer}>
      {days.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="white" size="large" />

          <Image
            style={{ width: 120, height: 120, marginBottom: -10 }}
            source={require('C:/Users/labinno/juriWeather/free-icon-cat-3460276.png')}
          />
          <Text style={styles.loadingment}>위치 정보를 가져오는 중입니댱!</Text>
        </View>
      ) : (
        <View>
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
              {days.map((day, index) => (
                <Day
                  key={index}
                  icon={day.weather[0].icon}
                  temp={roundToTwo(day.main.temp)}
                  tempmax={roundToTwo(day.main.temp_max)}
                  tempmin={roundToTwo(day.main.temp_min)}
                  description={day.weather[0].description}
                  date={new Date(day.dt * 1000).toDateString()}
                />
              ))}
            </ScrollView>
            {renderPagination()}
          </View>
          <ScrollView style={styles.weather}>
            {days.map((day, index) => (
              <Week
                key={index}
                icon={day.weather[0].icon}
                tempmax={roundToTwo(day.main.temp_max)}
                tempmin={roundToTwo(day.main.temp_min)}
                date={new Date(day.dt * 1000).toDateString()}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  //로딩
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', // 세로 방향 가운데 정렬
    alignItems: 'center', // 가로 방향 가운데 정렬
    backgroundColor: 'rgba(60, 113, 168, 0.8)',
  },
  loadingment: {
    color: 'white',
    marginTop: 20,
  },
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
  //주차별 날씨
  weather: {
    backgroundColor: 'rgba(39, 111, 187, 0.8)',
    margin: 20,
    borderRadius: 10,
  },
});
