import { Item } from './item';

export function Main() {
  return (
    <section className="main">
      <ul className="todo-list">
        <Item />
        <Item />
      </ul>
    </section>
  );
}
