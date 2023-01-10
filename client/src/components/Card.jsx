export default function Card(props) {
  return (
    <div>
      <img
        src={`${props.cover}`}
        alt={`Book cover of ${props.title} by ${props.author}`}
      />
      <h3>{props.title}</h3>
      {props.subtitle && <h5>{props.subtitle}</h5>}
      <h4>{props.author}</h4>
      <p>Published Date: {props.publishedDate}</p>
      <p>Number of pages: {props.numberOfPages}</p>
      <p>ISBN: {props.isbnNumber}</p>
    </div>
  );
}
