import { StyleSheet, Text, View } from 'react-native';
import { AddIcon, Happy } from '../assets/icons';
import { colors, typography } from '../../theme';
import { Image } from 'react-native';
import React from 'react';

export const InsightCard = ({ title, value, icon }) => {
  if (title === 'Mood') {
    switch (value) {
      case 'happy':
        icon = '😁';
        break;
    }
  }
  return (
    <View style={title ? styles.container : styles.addContainer}>
      {title ? (
        <View style={styles.textHolder}>
          <Text style={styles.title}>{title}</Text>
          {icon ? (
            <Text style={styles.emoji}>{icon}</Text>
          ) : (
            <Text style={styles.text}>{value}</Text>
          )}
        </View>
      ) : (
        <AddIcon />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 10,
    height: 99,
    width: 78,
  },
  textHolder: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  title: {
    fontSize: typography.small,
    fontFamily: typography.semiBold,
  },
  text: {
    fontSize: typography.default,
    fontFamily: typography.semiBold,
  },
  emoji: {
    fontSize: 28,
    fontFamily: typography.semiBold,
  },
  addContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 99,
    width: 78,
  },
});
