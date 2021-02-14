export const Heading1 = ({ children, className, style }) => (
  <h1
    className={`text-4xl font-medium text-coolGray-700 dark:text-coolGray-200 ${className}`}
    style={style}
  >
    {children}
  </h1>
)

export const Heading2 = ({ children, className, style }) => (
  <h2
    className={`text-lg font-medium text-coolGray-600 dark:text-coolGray-200 ${className}`}
    style={style}
  >
    {children}
  </h2>
)
