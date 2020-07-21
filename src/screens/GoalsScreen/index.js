import React, {useState} from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import {StatusBar} from 'react-native';
import GoalsScreen from './GoalsScreen';
import {GoalModal} from '../../components';
import {asyncStorage} from '../../utils';

const GoalsScreenContainer = ({goals}) => {
  const [currentGoal, setCurrentGoal] = useState();
  const [financialGoals, setFinancialGoals] = useState(goals);
  const [isShowGoalModal, setIsShowGoalModal] = useState(false);
  const [viewableGoal, setViewableGoal] = useState({item: financialGoals[0]});

  const showGoalModalHandler = goal => {
    if (goal && goal.id) {
      setCurrentGoal(goal);
    }
    setIsShowGoalModal(true);
  };

  const hideGoalModalHandler = () => {
    if (setCurrentGoal) {
      setCurrentGoal(undefined);
    }
    setIsShowGoalModal(false);
  };

  const doneActionHandler = async details => {
    let updatedGoals = [];

    if (!currentGoal) {
      updatedGoals = [
        {
          id: shortid.generate(),
          currentGoalValue: 0,
          ...details,
        },
        ...financialGoals,
      ];
    } else {
      updatedGoals = financialGoals.map(goal => {
        if (goal.id === currentGoal.id) {
          const updatedGoal = {
            ...goal,
            ...details,
            goalValue:
              details.goalValue < goal.goalValue
                ? goal.goalValue
                : details.goalValue,
          };
          if (viewableGoal && viewableGoal.item.id === currentGoal.id) {
            setViewableGoal({item: updatedGoal});
          }
          return updatedGoal;
        }
        return goal;
      });
    }

    await asyncStorage.storeData('goals', updatedGoals);
    setFinancialGoals(updatedGoals);
  };

  const deleteActionHandler = () => {
    if (currentGoal) {
      const filteredGoals = financialGoals.filter(
        goal => goal.id !== currentGoal.id,
      );

      setFinancialGoals(filteredGoals);
      asyncStorage.storeData('goals', filteredGoals);
    }
  };

  const addPercentageHandler = async () => {
    if (viewableGoal) {
      const updatedGoals = financialGoals.map(goal => {
        const percentage = +(goal.currentGoalValue / goal.goalValue).toFixed(1);

        if (goal.id === viewableGoal.item.id && percentage !== 1) {
          const addedVal = +(goal.goalValue / 10).toFixed(3);
          const currentGoalValue = goal.currentGoalValue + addedVal;
          const updatedGoal = {
            ...goal,
            currentGoalValue,
          };
          setViewableGoal({item: updatedGoal});
          return updatedGoal;
        }
        return goal;
      });
      await asyncStorage.storeData('goals', updatedGoals);
      setFinancialGoals(updatedGoals);
    }
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={isShowGoalModal ? 'rgba(18, 18, 18, 0.7)' : '#fff'}
      />
      <GoalsScreen
        goals={financialGoals}
        viewableGoal={viewableGoal}
        setViewableGoal={setViewableGoal}
        showGoalModal={showGoalModalHandler}
        addPercentage={addPercentageHandler}
      />
      <GoalModal
        initialState={currentGoal}
        isVisible={isShowGoalModal}
        doneAction={doneActionHandler}
        hideModal={hideGoalModalHandler}
        deleteAction={deleteActionHandler}
      />
    </>
  );
};

GoalsScreenContainer.propTypes = {
  goals: PropTypes.array.isRequired,
};

export default GoalsScreenContainer;
