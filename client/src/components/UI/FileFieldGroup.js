import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const FileFieldGroup = ({
  label,
  error,
  info,
  type,
  onChange,
  accept
}) => {
  return (
    <div>
      <input
        type={type}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        onChange={onChange}
        accept={accept}
      />
      {info && <small>{info}</small>}
      {error && <div>{error}</div>}
    </div>
  );
};

FileFieldGroup.propTypes = {
  // name: PropTypes.string.isRequired,
  // value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

FileFieldGroup.defaultProps = {
  type: 'file'
};

export default FileFieldGroup;
