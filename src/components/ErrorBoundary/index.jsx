/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Fallback component if there is any error exception in UI
 */
import { useRouteError } from 'react-router-dom';

export const ErrorBoundary = () => {
  //-------------- State & Variables --------------//
  const error = useRouteError();

  //-------------- Use Effects --------------//

  //-------------- Other Methods --------------//

  return (
    <section>
      <h1>Error Boundary</h1>
      <small>{error?.message}</small>
    </section>
  );
};
