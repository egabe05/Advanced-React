import PropTypes from 'prop-types';
import Header from './Header';

export default function Page({ children }) {
  return (
    <>
      <Header />
      <h2>I am the page component</h2>
      {children}
    </>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
