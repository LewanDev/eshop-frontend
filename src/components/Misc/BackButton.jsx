import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigates back one step in the history stack
  };

  return (
    <>
      <button className="btn-red-xl" onClick={handleGoBack}>
        Volver
      </button>
    </>
  );
};

export default BackButton;
