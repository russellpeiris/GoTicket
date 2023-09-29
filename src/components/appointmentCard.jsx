import { colors, dimen, typography } from '../../theme';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from '@rneui/base';
import React from 'react';

export const AppointmentCard = ({ docName, docTitle, location, dayAndTime }) => {
  return docName && docTitle && location && dayAndTime ? (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
          style={{ width: 87, height: 95 }}
        />
      </View>
      <View style={styles.textArea}>
        <Text style={styles.name}>{docName}</Text>
        <Text style={styles.title}>{docTitle}</Text>
        <Text style={styles.title}>{location}</Text>
        <View style={styles.time}>
          <Text style={{ fontFamily: typography.medium, fontSize: 13 }}>{dayAndTime}</Text>
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.empty}>
      <Text style={{ fontFamily: typography.semiBold, color: colors.disabled }}>
        No upcoming appointments.
      </Text>
      <Text style={{ fontFamily: typography.regular, color: colors.disabled }}>
        Once you make an Appointment it will be here
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.borderGray,
    borderWidth: 1,
    borderRadius: 10,
    padding: dimen.default,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  textArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: dimen.default,
  },
  name: {
    fontSize: typography.default,
    fontFamily: typography.semiBold,
  },
  title: {
    fontSize: 13,
    fontFamily: typography.medium,
  },
  location: {
    fontSize: 13,
    fontFamily: typography.medium,
  },
  time: {
    borderColor: colors.borderGray,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  empty: {
    borderColor: colors.borderGray,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dashed',
    padding: dimen.default,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
