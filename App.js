import React, { useState, useRef } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef();

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

  return (
    <View style={styles.normalContainer}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
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
