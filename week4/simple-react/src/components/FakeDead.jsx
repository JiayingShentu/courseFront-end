import { useState } from 'react';

export function FakeDead() {
  const [count, setCount] = useState(() => {
    console.log('calculate');
    return {
      a: 1,
      b: 2,
      c: 3,
    };
  });
  console.log('FakeDead', count);
  return (
    <div
      onClick={() => {
        setCount({
          ...count,
          a: count.a + 1,
        });
      }}>
      {count.a}
    </div>
  );
}
