import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, typography } from '../../theme'

export const InsightCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        BP
      </Text>
      <Text style={styles.text}>
        110/69
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.borderGray,
        borderRadius: 10,
        padding: 24,
        height: 94,
        width: 73
    },
    title:{
        fontSize: 12,
        fontFamily: typography.semiBold,
    },
    text:{
        fontSize: typography.small,
        fontFamily: typography.semiBold,
    }
})