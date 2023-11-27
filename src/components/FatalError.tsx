import { ApiErrorType } from "../state/favmovie.types";
import { errorToMessage } from "../state/mapper";

export default function FatalError({errorMessage}: {errorMessage: ApiErrorType}) {
  
  return (
    <div id="fatal-error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorToMessage(errorMessage)}</i>
      </p>
    </div>
  );
}