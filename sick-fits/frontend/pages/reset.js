import Reset from '../components/Reset';
import RequestReset from '../components/RequestReset';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </>
    );
  }
  return <Reset token={query.token} />;
}
