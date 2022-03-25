export function Item() {
  return (
    <li>
      <div className="view">
        <input className="toggle" type={'checkbox'} />
        <label>睡觉</label>
        <button type="button" className="destory"></button>
      </div>
    </li>
  );
}
