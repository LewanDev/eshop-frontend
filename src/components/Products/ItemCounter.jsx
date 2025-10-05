import { useState } from "react";

const ItemCounter = ({ initial = 1, onChange }) => {
  const [count, setCount] = useState(initial);

  const increase = (e) => {
    e.stopPropagation();
    const newValue = count + 1;
    setCount(newValue);
    onChange?.(newValue);
  };

  const decrease = (e) => {
    e.stopPropagation();
    if (count > 1) {
      const newValue = count - 1;
      setCount(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div className="flex items-center gap-3 select-none">
      <button
        className="text-lg font-bold px-2 py-1 rounded-md hover:bg-(--color-transparent-o4)"
        onClick={decrease}
      >
        ➖
      </button>
      <span className="text-xl font-semibold w-6 text-center">{count}</span>
      <button
        className="text-lg font-bold px-2 py-1 rounded-md hover:bg-(--color-transparent-o4)"
        onClick={increase}
      >
        ➕
      </button>
    </div>
  );
};

export default ItemCounter;
