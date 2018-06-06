import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({ name, value, error, info, onChange, options, className, id, disabled }) => {

  return (
      <select
        className={className}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="">+1</option>
        <option value="">+86</option>
        <option value="">+81</option>
      </select>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
