import React from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native';
import {code} from 'currency-codes';

import 'intl';
import 'intl/locale-data/jsonp/en';
import {noop} from '../../utils';

const FlexNumericInput = ({
  value,
  onUpdate,
  locale = 'en-GB',
  type = 'decimal',
  currency = 'USD',
  useGrouping = true,
  ...textInputProps
}) => {
  const createFormatConfig = () => {
    const typeOptions = {};
    let {decimalPlaces = 0} = textInputProps;

    if (type === 'currency') {
      typeOptions.currency = currency;
      decimalPlaces = code(currency).digits;
    } else {
      typeOptions.minimumFractionDigits = decimalPlaces;
    }

    return Object.assign({}, typeOptions, {
      locale,
      style: type,
      useGrouping,
      divisor: Math.pow(10, decimalPlaces),
    });
  };

  const formatConfig = createFormatConfig();

  const formatNumberValue = (numberValue, numberFormatConfig) => {
    let returnValue = '';

    if (numberValue) {
      const {locale, ...config} = numberFormatConfig;

      // eslint-disable-next-line no-undef
      returnValue = new Intl.NumberFormat(locale, config).format(numberValue);
    }

    return returnValue;
  };

  const parseStringValue = (text, numberFormatConfig) => {
    const digitsOnly = text.match(/\d+/g);

    return digitsOnly
      ? parseInt(digitsOnly.join(''), 10) / numberFormatConfig.divisor
      : undefined;
  };

  const onUpdateHandler = text => {
    const parsedValue = parseStringValue(text, formatConfig);

    if (onUpdate) {
      onUpdate(parsedValue);
    }
  };

  return (
    <TextInput
      {...textInputProps}
      maxLength={15}
      keyboardType="number-pad"
      onChangeText={onUpdateHandler}
      value={formatNumberValue(value, formatConfig)}
    />
  );
};

FlexNumericInput.defaultProps = {
  onUpdate: noop,
  locale: 'en-GB',
  type: 'decimal',
  currency: 'USD',
  useGrouping: true,
};

FlexNumericInput.propTypes = {
  type: PropTypes.string,
  onUpdate: PropTypes.func,
  locale: PropTypes.string,
  currency: PropTypes.string,
  useGrouping: PropTypes.bool,
  value: PropTypes.number.isRequired,
};

export default FlexNumericInput;
