import React from 'react';
import PropTypes from 'prop-types';
import {MaskedViewIOS, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LinearTextGradient} from 'react-native-text-gradient';
import {responsivePlatform} from '../../utils';

const FlexTextGradient = props => {
  const {colors, children, style} = props;

  return responsivePlatform.isIos ? (
    <MaskedViewIOS maskElement={<Text {...props} />}>
      <LinearGradient colors={colors} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
        <Text {...props} style={[style, styles.noOpacity]} />
      </LinearGradient>
    </MaskedViewIOS>
  ) : (
    <LinearTextGradient
      style={style}
      locations={[0, 1]}
      colors={colors}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <Text>{children}</Text>
    </LinearTextGradient>
  );
};

const styles = StyleSheet.create({
  noOpacity: {
    opacity: 0,
  },
});

FlexTextGradient.defaultProps = {
  style: {},
};

FlexTextGradient.propTypes = {
  style: PropTypes.object,
  colors: PropTypes.array.isRequired,
  children: PropTypes.any.isRequired,
};

export default FlexTextGradient;
