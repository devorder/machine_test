import { Link } from 'react-router-dom';
import { MdPostAdd, MdMessage } from 'react-icons/md';

import classes from './MainHeader.module.css';

function MainHeader() {
  return (
    <header className={classes.header}>
      <h1 className={`${classes.logo} text-dark`}>
        <MdMessage />
        Student
      </h1>
      <p>
        <Link to="/create-student" className={`${classes.button} text-dark text-decoration-none`} >
          <MdPostAdd size={18} />
          New Student
        </Link>
      </p>
    </header>
  );
}

export default MainHeader;
