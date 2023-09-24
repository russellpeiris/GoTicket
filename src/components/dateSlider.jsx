import {
  eachWeekOfInterval,
  eachDayOfInterval,
  subDays,
  addDays,
  startOfWeek,
  day,
  format,
} from 'date-fns';
import PagerView, { PagerViewOnPageSelectedEvent } from 'react-native-pager-view';
import { colors, dimen, typography } from '../../theme';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import React from 'react';

const startDate = subDays(new Date(), 7);

const endDate = addDays(new Date(), 7);

const dates = eachWeekOfInterval({
  start: startDate,
  end: endDate,
}).reduce((acc, date) => {
  const allDays = eachDayOfInterval({
    start: subDays(date, 2),
    end: addDays(date, 2),
  });

  acc.push(allDays);
  return acc;
}, []);
export const DateSlider = () => {
  const [currentPage, setCurrentPage] = useState(1); // Current page index
  const handlePageChange = (event) => {
    setCurrentPage(event.nativeEvent.position);
  };

  function isToday(date) {
    return date.getDate() === new Date().getDate();
  }
  return (
    <View style={{ flex: 1, padding: dimen.default }}>
      <PagerView style={styles.slider} initialPage={1} onPageSelected={handlePageChange}>
        {dates.map((week, index) => {
          return (
            <View key={index} style={{}}>
              <View style={styles.weeks}>
                {week.map((day, index) => {
                  const dayName = format(day, 'EEE');
                  const today = isToday(day);
                  return (
                    <View key={index} style={(today ? styles.today : styles.day)}>
                      <Text style={today ? styles.todayText : styles.dayText}>{dayName}</Text>
                      <Text style={today ? styles.todayText : styles.dayText}>{day.getDate()}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    flex: 1,
    height: 80,
  },
  weeks: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  day: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 51,
    height: 66,
    borderColor: colors.borderGray,
    borderRadius: 11,
  },
  dayText: {
    fontFamily: typography.semiBold,
  },
  today: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 70,
    borderRadius: 11,
    backgroundColor: colors.primaryPink,
    elevation: 10,
  },
  todayText: {
    color: 'white',
    fontFamily: typography.bold,
    fontSize: typography.default,
  },
});
