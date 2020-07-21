import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, FlatList} from 'react-native';

import AddGoalIcon from '../../assets/addGoal.svg';
import {colors, responsivePlatform} from '../../utils';
import AddProgressIcon from '../../assets/addProgress.svg';
import {FlexButton, GoalCard, GoalEmpty} from '../../components';

const GoalsScreen = ({
  showGoalModal,
  goals,
  addPercentage,
  setViewableGoal,
  viewableGoal,
}) => {
  const percentage =
    viewableGoal &&
    viewableGoal.item &&
    +(viewableGoal.item.currentGoalValue / viewableGoal.item.goalValue).toFixed(
      1,
    );
  const keyExtractor = item => item.id;

  const onViewRef = useRef(({viewableItems}) => {
    setViewableGoal(viewableItems[0]);
  });

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>HrantGoalApp</Text>
        <FlexButton style={styles.addGoalIconContainer} onPress={showGoalModal}>
          <AddGoalIcon style={styles.addGoalIcon} />
        </FlexButton>
      </View>
      <View style={styles.goalsContainer}>
        <Text style={styles.financialTitle}>Financial Goals</Text>
        <FlatList
          horizontal
          data={goals}
          renderItem={props => (
            <GoalCard {...props} showCurrentGoal={showGoalModal} />
          )}
          style={styles.fullWidth}
          keyExtractor={keyExtractor}
          ListEmptyComponent={<GoalEmpty />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.fullWidth}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
        />
      </View>
      {!!goals.length && percentage !== 1 && (
        <View style={styles.addPercentContainer}>
          <FlexButton onPress={addPercentage}>
            <AddProgressIcon />
          </FlexButton>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: responsivePlatform.widthPercentageToDP('4.3%'),
    paddingTop:
      responsivePlatform.safeAreaTopHeight +
      responsivePlatform.heightPercentageToDP('1.2%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: responsivePlatform.heightPercentageToDP('1.4%'),
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'System',
    letterSpacing: 0.374,
    color: colors.primary,
    fontSize: responsivePlatform.responsiveFontSize(4.1),
    lineHeight: responsivePlatform.heightPercentageToDP('5%'),
  },
  addGoalIconContainer: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addGoalIcon: {
    paddingRight: responsivePlatform.widthPercentageToDP('16.5%'),
  },
  goalsContainer: {
    flex: 1,
    marginTop: responsivePlatform.heightPercentageToDP('5.2%'),
  },
  financialTitle: {
    fontWeight: 'bold',
    letterSpacing: -0.2,
    fontFamily: 'System',
    color: colors.primary,
    fontSize: responsivePlatform.responsiveFontSize(2.7),
    lineHeight: responsivePlatform.heightPercentageToDP('3.4%'),
    marginBottom: responsivePlatform.heightPercentageToDP('1.9%'),
  },
  addPercentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsivePlatform.heightPercentageToDP('5.9%'),
  },
  fullWidth: {
    marginHorizontal: -responsivePlatform.widthPercentageToDP('4.3%'),
    paddingHorizontal: responsivePlatform.widthPercentageToDP('4.3%'),
  },
});

GoalsScreen.propTypes = {
  addPercentage: PropTypes.func.isRequired,
  viewableGoal: PropTypes.object.isRequired,
  showGoalModal: PropTypes.func.isRequired,
  setViewableGoal: PropTypes.func.isRequired,
};

export default GoalsScreen;
