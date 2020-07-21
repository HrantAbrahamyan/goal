import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import {noop} from '../../utils';

const FlexButton = ({onPress, disabled, children, ...restProps}) => (
  <TouchableOpacity
    activeOpacity={disabled ? 0.9 : 0.7}
    onPress={!disabled ? onPress : noop}
    {...restProps}>
    {children}
  </TouchableOpacity>
);

FlexButton.defaultProps = {
  onPress: noop,
  disabled: false,
};

FlexButton.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default FlexButton;
