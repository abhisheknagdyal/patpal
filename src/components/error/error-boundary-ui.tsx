import { CircleX } from "lucide-react";

type Props = {
  error: { message: string };
  resetErrorBoundary: () => void;
};

const ErrorBoundaryUi = ({ error, resetErrorBoundary }: Props) => {
  console.error(error.message);
  return (
    <div className="h-screen flex items-center justify-center flex-col text-xl">
      <CircleX size={40} stroke="red" onClick={resetErrorBoundary} />
      Something went wrong.
    </div>
  );
};

export default ErrorBoundaryUi;
