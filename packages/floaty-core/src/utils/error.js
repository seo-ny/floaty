const createError = (message, cause) => {
  return new Error(message, { cause });
};

const throwError = (message, cause) => {
  throw createError(message, cause);
};

export { createError, throwError };
