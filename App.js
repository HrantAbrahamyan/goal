import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {GoalsScreen} from './src/screens';
import {asyncStorage} from './src/utils';
import {FlexSpinner} from './src/components';

const App = () => {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getGoals = async () => {
      setIsLoading(true);
      try {
        const storedGoals = await asyncStorage.getData('goals');
        storedGoals && setGoals(storedGoals);
        setIsLoading(false);
      } catch (e) {
        setGoals([]);
        setIsLoading(false);
      }
    };

    getGoals();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {isLoading ? <FlexSpinner /> : <GoalsScreen goals={goals} />}
    </>
  );
};

export default App;
