import { colors, dimen, typography } from '../../theme';
import { StyleSheet, Text, View } from 'react-native';
import { he } from 'date-fns/locale';
import React from 'react';
import { Image } from '@rneui/base';

export const ArticleCard = ({ title, content, imageUrl }) => {
  return (
    <View style={styles.container}>
      <View style= {styles.textContainer}>
      <View >
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <Text style={styles.content} numberOfLines={4}>
          {content}
        </Text>

      </View>
      </View>
      <Image source={
        {
          uri: imageUrl,
        }
      } style={styles.image} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 10,
    padding: 24,
    height: 163,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: typography.default,
    fontFamily: typography.semiBold,
    paddingBottom: 8,
  },
  content: {
    fontSize: typography.small,
    fontFamily: typography.medium,
  },
  image: {
    width: 100,
    height: '100%', 
    resizeMode: 'cover', 
    borderRadius: 10,
    marginLeft: 10,
  },
});
