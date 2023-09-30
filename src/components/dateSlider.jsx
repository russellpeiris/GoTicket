import PagerView, { PagerViewOnPageSelectedEvent } from 'react-native-pager-view';
import { colors, dimen, typography } from '../../theme';
import { StyleSheet, Text, View } from 'react-native';
import { format } from 'date-fns';
import { useState } from 'react';
import React from 'react';

const currentDate = new Date();
const currentDay = currentDate.getDate();

const numGroups = 5;
const daysToShow = 5;
const dateGroups = [];

const midGroup = Math.floor(numGroups / 2);
const midDay = Math.floor(daysToShow / 2);

for (let i = 0; i < numGroups; i++) {
  const centerDate = new Date(currentDate);
  centerDate.setDate(currentDay + (-midGroup + i) * 5); // Adjust the center date for each group

  const group = [];

  for (let j = -midDay; j <= midDay; j++) {
    const date = new Date(centerDate);
    date.setDate(centerDate.getDate() + j);
    group.push(date);
  }

  dateGroups.push(group);
}

export const DateSlider = () => {
  const [currentPage, setCurrentPage] = useState(1); // Current page index
  const handlePageChange = (event) => {
    setCurrentPage(event.nativeEvent.position);
  };

  function isToday(date) {
    return date.getDate() === new Date().getDate();
  }
  return (
    <View>
      <PagerView style={styles.slider} initialPage={midGroup} onPageSelected={handlePageChange}>
        {dateGroups.map((week, index) => {
          return (
            <View key={index} style={{}}>
              <View style={styles.weeks}>
                {week.map((day, index) => {
                  const dayName = format(day, 'EEE');
                  const today = isToday(day);
                  return (
                    <View key={index} style={today ? styles.today : styles.day}>
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
    height: 90,
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
    fontFamily: typography.bold,
    color: colors.inactiveGray,
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
