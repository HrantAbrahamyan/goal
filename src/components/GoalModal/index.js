import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import {
  Text,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import DatePicker from 'react-native-datepicker';

import FlexButton from '../FlexButton';
import CheckIcon from '../../assets/check.svg';
import FlagIcon from '../../assets/flag.svg';
import DateIcon from '../../assets/date.svg';
import GoIcon from '../../assets/go.svg';
import DeleteIcon from '../../assets/delete.svg';
import FlexTextGradient from '../FlexTextGradient';
import {colors, responsivePlatform, gradientBackgrounds} from '../../utils';
import FlexNumericInput from '../FlexNumericInput';

const GoalModal = ({
  isVisible,
  doneAction,
  hideModal,
  deleteAction,
  initialState,
}) => {
  const pickerRef = useRef(null);
  const [selectedColorConfig, setSelectedColorConfig] = useState(
    initialState.selectedColorConfig,
  );
  const [untillDate, setUntillDate] = useState(initialState.untillDate);
  const [goalTitle, setGoalTitle] = useState(initialState.goalTitle);
  const [goalValue, setGoalValue] = useState(initialState.goalValue);
  const disabled = !goalValue || !goalTitle;

  useEffect(() => {
    if (initialState) {
      setSelectedColorConfig(initialState.selectedColorConfig);
      setUntillDate(initialState.untillDate);
      setGoalTitle(initialState.goalTitle);
      setGoalValue(initialState.goalValue);
    }
  }, [initialState]);

  const renderGradientBackground = ({item, index}) => (
    <FlexButton onPress={() => setSelectedColorConfig(item)}>
      <LinearGradient
        end={{x: 0, y: 0.7}}
        start={{x: 1, y: 0}}
        colors={item.colors}
        locations={item.locations}
        style={[styles.gradientItem, index === 0 && styles.noMarginLeft]}
      />
      {item.id === selectedColorConfig.id && (
        <View style={styles.checkIcon}>
          <CheckIcon />
        </View>
      )}
    </FlexButton>
  );

  const keyExtractor = item => item.id;

  const onPressDateHandler = () => pickerRef.current.onPressDate();

  const resetStateHandler = () => {
    hideModal();
    setGoalTitle('');
    setGoalValue(0);
    setUntillDate(null);
    setSelectedColorConfig(gradientBackgrounds[0]);
  };

  const doneActionHandler = async () => {
    if (disabled) {
      return resetStateHandler();
    }

    await doneAction({goalTitle, goalValue, untillDate, selectedColorConfig});
    return resetStateHandler();
  };

  const deleteActionHandler = () => {
    resetStateHandler();
    deleteAction();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={resetStateHandler}
      backdropColor="rgba(18, 18, 18, 1)"
      style={styles.bottomModal}>
      <KeyboardAvoidingView
        behavior={responsivePlatform.isIos ? 'padding' : 'height'}
        keyboardVerticalOffset={
          responsivePlatform.isIos
            ? 0
            : responsivePlatform.heightPercentageToDP('4%')
        }
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <LinearGradient
              end={{x: 0, y: 0.7}}
              start={{x: 1, y: 0}}
              style={styles.gradientContainer}
              colors={selectedColorConfig.colors}
              locations={selectedColorConfig.locations}
            />
            <View style={styles.content}>
              <View>
                <View style={styles.header}>
                  <Text style={styles.title}>Financial</Text>
                  <FlexButton onPress={doneActionHandler}>
                    <FlexTextGradient
                      style={styles.doneText}
                      colors={['#7642EE', '#603FE6']}>
                      Done
                    </FlexTextGradient>
                  </FlexButton>
                </View>
                <TextInput
                  value={goalTitle}
                  placeholder="For smoothie"
                  placeholderTextColor="#eeebeb"
                  onChangeText={setGoalTitle}
                  style={[
                    styles.goalName,
                    styles.fillWidth,
                    styles.borderedSides,
                  ]}
                />
                <FlatList
                  horizontal
                  data={gradientBackgrounds}
                  keyExtractor={keyExtractor}
                  renderItem={renderGradientBackground}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={[
                    styles.gradientContentContainer,
                    styles.fillWidth,
                  ]}
                  style={[
                    styles.gradientsContainer,
                    styles.gradientContentContainer,
                    styles.fillWidth,
                  ]}
                />
                <View
                  style={[
                    styles.dateContainer,
                    styles.fillWidth,
                    styles.borderedSides,
                    styles.rowCenterContainer,
                  ]}>
                  <View style={styles.rowCenterContainer}>
                    <DateIcon />
                    <Text style={styles.countActionText}>Untill</Text>
                  </View>
                  <FlexButton
                    onPress={onPressDateHandler}
                    style={styles.rowCenterContainer}>
                    <DatePicker
                      ref={pickerRef}
                      date={untillDate}
                      mode="date"
                      format="DD MMMM"
                      cancelBtnText="Cancel"
                      confirmBtnText="Confirm"
                      showIcon={false}
                      placeholder="18 March"
                      customStyles={{
                        dateText: styles.textStyle,
                        dateInput: [
                          styles.dateInputStyle,
                          styles.rowCenterContainer,
                        ],
                        placeholderText: [styles.textStyle, styles.placeHolder],
                      }}
                      onDateChange={setUntillDate}
                    />
                    <GoIcon />
                  </FlexButton>
                </View>
                <View
                  style={[
                    styles.goalContainer,
                    styles.fillWidth,
                    styles.rowCenterContainer,
                  ]}>
                  <View style={styles.rowCenterContainer}>
                    <FlagIcon />
                    <Text style={styles.countActionText}>Goal</Text>
                  </View>
                  <View style={styles.rowCenterContainer}>
                    <View style={styles.dateInputStyle}>
                      <FlexNumericInput
                        value={goalValue}
                        type="currency"
                        onUpdate={setGoalValue}
                        style={styles.textStyle}
                        placeholder="$112,000.00"
                        placeholderTextColor="#eeebeb"
                      />
                    </View>
                    <GoIcon />
                  </View>
                </View>
              </View>
              <FlexButton
                onPress={deleteActionHandler}
                style={styles.deleteIcon}>
                <DeleteIcon />
              </FlexButton>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomModal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
  },
  placeHolder: {
    color: '#eeebeb',
  },
  textStyle: {
    color: '#A6A6AB',
    letterSpacing: -0.408,
    fontFamily: 'System',
    width: '100%',
    textAlign: 'right',
    fontSize: responsivePlatform.responsiveFontSize(2),
    lineHeight: responsivePlatform.heightPercentageToDP('2.7%%'),
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    justifyContent: 'space-between',
    paddingHorizontal: responsivePlatform.widthPercentageToDP('4.3%'),
    paddingTop: responsivePlatform.heightPercentageToDP('3.4%'),
  },
  gradientContainer: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: responsivePlatform.safeAreaTopHeight,
    height: responsivePlatform.heightPercentageToDP('3.6%'),
    marginHorizontal: responsivePlatform.widthPercentageToDP('9.8%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsivePlatform.heightPercentageToDP('4.4%'),
  },
  title: {
    fontWeight: 'bold',
    letterSpacing: -0.2,
    fontFamily: 'System',
    color: '#000',
    lineHeight: responsivePlatform.heightPercentageToDP('3.4%'),
    fontSize: responsivePlatform.responsiveFontSize(2.7),
  },
  doneText: {
    letterSpacing: -0.408,
    fontFamily: 'System',
    fontSize: responsivePlatform.responsiveFontSize(2),
    lineHeight: responsivePlatform.heightPercentageToDP('2.7%%'),
  },
  deleteIcon: {
    maxWidth: responsivePlatform.widthPercentageToDP('5.3%'),
    paddingVertical: responsivePlatform.heightPercentageToDP('3.1%'),
  },
  dateInputStyle: {
    borderWidth: 0,
    padding: 0,
    justifyContent: 'center',
    height: 56,
    paddingRight: responsivePlatform.widthPercentageToDP('3%'),
  },
  borderedSides: {
    height: 56,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EBEBEB',
  },
  goalName: {
    letterSpacing: -0.408,
    fontFamily: 'System',
    color: colors.primary,
    fontSize: responsivePlatform.responsiveFontSize(2),
    lineHeight: responsivePlatform.heightPercentageToDP('2.7%%'),
  },
  gradientContentContainer: {
    maxHeight: responsivePlatform.heightPercentageToDP('10%'),
  },
  gradientsContainer: {
    marginVertical: responsivePlatform.heightPercentageToDP('3.4%'),
  },
  noMarginLeft: {
    marginLeft: 0,
  },
  gradientItem: {
    width: responsivePlatform.widthPercentageToDP('16.5%'),
    height: responsivePlatform.widthPercentageToDP('16.5%'),
    borderRadius: responsivePlatform.widthPercentageToDP('16.5%') / 2,
    marginLeft: responsivePlatform.widthPercentageToDP('4.3%'),
  },
  checkIcon: {
    marginRight: 2,
    marginBottom: 2,
    backgroundColor: colors.primary,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    right: 0,
    width: responsivePlatform.widthPercentageToDP('4.8%'),
    height: responsivePlatform.widthPercentageToDP('4.8%'),
    borderRadius: responsivePlatform.widthPercentageToDP('4.8%') / 2,
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: {height: 2, width: 0},
    elevation: 2,
  },
  dateContainer: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    justifyContent: 'space-between',
    height: responsivePlatform.heightPercentageToDP('6.8%'),
  },
  rowCenterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateRightContainer: {},
  fillWidth: {
    marginHorizontal: -responsivePlatform.widthPercentageToDP('4.3%'),
    paddingHorizontal: responsivePlatform.widthPercentageToDP('4.3%'),
  },
  countActionText: {
    letterSpacing: -0.408,
    fontFamily: 'System',
    fontWeight: '600',
    color: colors.primary,
    fontSize: responsivePlatform.responsiveFontSize(2),
    lineHeight: responsivePlatform.heightPercentageToDP('2.7%%'),
    marginLeft: responsivePlatform.widthPercentageToDP('3.2%'),
  },
  goalContainer: {
    height: 56,
    borderBottomWidth: 1,
    borderColor: '#EBEBEB',
    justifyContent: 'space-between',
  },
});

GoalModal.defaultProps = {
  initialState: {
    selectedColorConfig: gradientBackgrounds[0],
    untillDate: null,
    goalTitle: '',
    goalValue: 0,
  },
};

GoalModal.propTypes = {
  initialState: PropTypes.object,
  deleteAction: PropTypes.func.isRequired,
  doneAction: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default GoalModal;
