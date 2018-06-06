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
        <div>
          <input
            type='checkbox'
            className={classnames('form-control form-control-lg', {
              'is-invalid': error
            })}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
          {info && <small>{info}</small>}
          {error && <div>{error}</div>}
        </div>
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
