type ButtonProps = {
  label: string;
  isLoading?: boolean;
  onClick?: () => void;
};

const SubmitLoadingButton: React.FC<ButtonProps> = ({
  label,
  isLoading,
}) => {
  return (
    <button
      type="submit"
      className={
        isLoading
          ? "form-control text-center disabled-button"
          : "form-control text-center"
      }
      disabled={isLoading}
    >
      {!isLoading && <span>{label}</span>}
      {isLoading && (
        <span>
          <i className="fa fa-spinner fa-spin"></i>
        </span>
      )}
    </button>
  );
};

export default SubmitLoadingButton;
