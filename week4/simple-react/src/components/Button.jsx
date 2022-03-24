export function Button(props) {
  const { color, onClick, children } = props;
  return (
    <button type="button" style={{ backgroundColor: color }} onClick={onClick}>
      {children}
    </button>
  );
}
