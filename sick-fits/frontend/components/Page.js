import PropTypes from 'prop-types';

export default function Page({ children }) {
  return (
    <>
      <h2>I am the page</h2>
      {children}
    </>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
