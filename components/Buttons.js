export const SmallButton = ({ children, className, onClick, type, style }) => (
  <button
    onClick={onClick}
    type={type ?? `button`}
    className={`flex flex-row justify-center items-center space-x-2 p-2 rounded-md bg-coolGray-100 text-coolGray-500 text-xs leading-none border border-transparent hover:border-coolGray-300 dark:bg-coolGray-700 dark:text-coolGray-100 dark:hover:border-coolGray-500 ${className}`}
    style={style}
  >
    {children}
  </button>
)

export const Button = ({ children, className, onClick, type, active }) => (
  <button
    type={type ?? `button`}
    className={`flex flex-row justify-center items-center space-x-2 px-4 py-2 rounded-md text-xs font-bold leading-none border border-transparent focus:border-dashed focus:outline-none ${className} ${
      active
        ? `bg-blue-100 text-blue-500 hover:border-blue-300 dark:bg-blue-700 dark:text-blue-100 dark:hover:border-blue-500 focus:border-blue-600 `
        : `bg-coolGray-100 text-coolGray-500 hover:border-coolGray-300 dark:bg-coolGray-700 dark:text-coolGray-100 dark:hover:border-coolGray-500 focus:border-coolGray-600`
    }`}
    onClick={onClick}
  >
    {children}
  </button>
)
