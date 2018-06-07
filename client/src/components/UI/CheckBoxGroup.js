import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CheckBoxGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  checkedFlg,
  className
}) => {

  if(checkedFlg){

    return (
        <input
          type='checkbox'
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          checked={checkedFlg}
          className={className}
        />
    );
  }else{

      return (
          <input
            type='checkbox'
            className={className}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
      );
  }
};

CheckBoxGroup.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.string,
};

export default CheckBoxGroup;
