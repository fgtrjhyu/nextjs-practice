export function Person({ person }) {
  return (
    <div>
      <h4>Person</h4>
      <hr/>
      <p>{ person.name }</p>
      <p>{ person.favorites.length }</p>
    </div>
  );
}
