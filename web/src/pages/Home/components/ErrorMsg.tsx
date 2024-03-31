import { FieldError } from 'react-hook-form';

type Props = {
  errorState: FieldError | undefined
};

function ErrorMsg({ errorState }: Props) {
  return (
    errorState && <span className="text-red-400 text-xs">{errorState.message}</span>
  );
}

export default ErrorMsg;
