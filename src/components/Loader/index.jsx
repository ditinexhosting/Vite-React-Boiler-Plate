/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Loader component covering whole screen
 */
export const Loader = () => {
  return (
    <div className="loader-container fixed z-50 top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(255,255,255,0.5)]">
      <span className="loader"></span>
    </div>
  );
};
