import React from 'react';
import PropTypes from 'prop-types';
import {ProgressCircle} from 'react-native-svg-charts';
import LinearGradient from 'react-native-linear-gradient';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

import FlexButton from '../FlexButton';
import PiggyBankIcon from '../../assets/piggybank.svg';
import {responsivePlatform, precision} from '../../utils';

const GoalCard = ({item, index, showCurrentGoal}) => {
  const {
    goalTitle,
    goalValue,
    untillDate,
    currentGoalValue,
    selectedColorConfig,
  } = item;
  const percentage = +(currentGoalValue / goalValue).toFixed(1);

  return (
    <FlexButton
      onPress={() => showCurrentGoal(item)}
      style={styles.buttonContainer}>
      <LinearGradient
        end={{x: 0, y: 0.7}}
        start={{x: 1, y: 0}}
        colors={selectedColorConfig.colors}
        locations={selectedColorConfig.locations}
        style={[styles.container, index === 0 && styles.noMarginLeft]}>
        <View style={styles.header}>
          <PiggyBankIcon />
          <Text style={styles.untilText}>until {untillDate}</Text>
        </View>
        <View style={{height: 80}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.goalTitle}>{goalTitle}</Text>
          </ScrollView>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.chartContainer}>
            <ProgressCircle
              progress={percentage}
              strokeWidth={12}
              progressColor="#fff"
              style={styles.progressChart}
              backgroundColor="rgba(255, 255, 255, 0.3)"
            />
            <View style={styles.progressTextContainer}>
              <Text style={styles.progressText}>{percentage * 100}%</Text>
            </View>
          </View>
          <View style={styles.progressInfoContainer}>
            <Text style={styles.currentAmountText}>
              $ {currentGoalValue.toFixed(precision(goalValue))}
            </Text>
            <Text style={[styles.currentAmountText, styles.amountText]}>
              of $ {goalValue}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </FlexButton>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    justifyContent: 'space-between',
    marginLeft: responsivePlatform.widthPercentageToDP('2.1%'),
    height: responsivePlatform.heightPercentageToDP('45%'),
    width: responsivePlatform.widthPercentageToDP('65.6%'),
    paddingHorizontal: responsivePlatform.widthPercentageToDP('4.3%'),
    paddingVertical: responsivePlatform.heightPercentageToDP('2.7%'),
  },
  buttonContainer: {
    height: responsivePlatform.heightPercentageToDP('45%'),
  },
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  untilText: {
    color: '#fff',
    fontFamily: 'System',
    letterSpacing: -0.078,
    fontSize: responsivePlatform.responsiveFontSize(1.6),
    marginLeft: responsivePlatform.widthPercentageToDP('2.6%'),
    lineHeight: responsivePlatform.heightPercentageToDP('2.2%'),
  },
  goalTitle: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: -0.2,
    fontFamily: 'System',
    fontSize: responsivePlatform.responsiveFontSize(2.7),
    lineHeight: responsivePlatform.heightPercentageToDP('3.4%'),
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  progressChart: {
    height: responsivePlatform.heightPercentageToDP('13%'),
  },
  progressTextContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    color: '#fff',
    fontFamily: 'System',
    letterSpacing: -0.408,
    fontSize: responsivePlatform.responsiveFontSize(2),
    lineHeight: responsivePlatform.heightPercentageToDP('2.7%'),
  },
  progressInfoContainer: {
    marginLeft: responsivePlatform.widthPercentageToDP('4.3%'),
  },
  chartContainer: {
    width: responsivePlatform.heightPercentageToDP('13%'),
  },
  currentAmountText: {
    color: '#fff',
    fontFamily: 'System',
    letterSpacing: -0.078,
    fontSize: responsivePlatform.responsiveFontSize(1.6),
    lineHeight: responsivePlatform.heightPercentageToDP('2.2%'),
  },
  amountText: {
    opacity: 0.5,
  },
  noMarginLeft: {
    marginLeft: 0,
  },
});

GoalCard.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default GoalCard;
