import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ArticleCard, DateSlider, InsightCard } from '../components';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors, dimen, typography } from '../../theme';
const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <GestureHandlerRootView style={styles.container}>
        <ScrollView>
<View>
            <View style={styles.header}>
              <Text style={styles.greeting}>
                Hello Samantha!
              </Text>
              <FontAwesome5 name="bell" size={24} color="black" />
            </View>
            <View>
            </View>
            <Text style={styles.weekText}>Week 1</Text>
            </View>
            <DateSlider/>
            <View style={{paddingTop: 16}}>
            <ArticleCard title='title' content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel libero nec nunc viverra posuere. Fusce euismod ex sit amet quam tincidunt, sed convallis eros varius. Proin euismod metus quis justo malesuada,Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel libero nec nunc viverra posuere. Fusce euismod ex sit amet quam tincidunt, sed convallis eros varius. Proin euismod metus quis justo malesuada,  '
            imageUrl={'https://i.imgur.com/UYiroysl.jpg'}
            />
            </View>
            <View style={styles.insightsContainer}>
            <Text style={styles.subTop}>My Daily Insights</Text>
            <View style={styles.insights}>
            <InsightCard title={null} />
            <InsightCard title='Mood' value='happy'/>
            <InsightCard title='BMI' value='18.5'/>
            <InsightCard title='BP' value='110/68'/>
            </View>
            </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    height: '100%',
    padding: dimen.default
  },
  header: {
    paddingTop: dimen.default,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekText: {
    fontFamily: typography.bold,
    fontSize: typography.subTitle,
    paddingVertical: dimen.default,
  },
  greeting: {
    fontFamily: typography.semiBold,
    fontSize: typography.default,
  },
  subTop: {
    fontFamily: typography.semiBold,
    fontSize: typography.default,
  },
  insightsContainer: {
    paddingVertical: 28,
  },
  insights: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
  },
});

