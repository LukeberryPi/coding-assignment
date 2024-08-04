import "../styles/starred.scss";

const Starred = ({ movies }) => {
  return <div data-testid="starred">Starred Movies: {movies.length}</div>;
};

export default Starred;
