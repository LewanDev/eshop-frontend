import "./Misc.css";

const Title = ({ children }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="w-sm h-0.5 bg-(--color-primary-lighter) mt-4 my-auto mb-2.5 rounded-xs"></span>
      <div className="text-4xl font-bold text-center text-(--color-dark) relative">
        {children}
      </div>
      <span className="w-sm h-0.5 bg-(--color-primary-lighter) mt-2.5 my-auto mb-4 rounded-xs"></span>
    </div>
  );
};

export default Title;
