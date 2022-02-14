import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Button from './Button';

const Header = ({ title, setShowAddTask, showTask }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1> {title} </h1>

      {location.pathname === '/' && < Button
        text={showTask ? 'Close' : 'Add'}
        color={showTask ? 'darkgreen' : 'green'}
        onClick={setShowAddTask}
      />}

    </header>
  );
};

Header.defaultProps = {
  title: 'Task tracker',
};

Header.protoTypes = {
  title: PropTypes.string.isRequired,
};
export default Header;
