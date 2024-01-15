/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function LinkAs({ as, to, className, children, ...rest }) {
  const Component = as;
  return (
    <Link to={to}>
      <Component className={className} {...rest}>
        {children}
      </Component>
    </Link>
  );
}

LinkAs.propTypes = {
  className: PropTypes.string,
  as: PropTypes.elementType.isRequired,
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

LinkAs.defaultProps = {
  className: '',
};

export default LinkAs;
