// ToDo: create logger with extended messages, stacktrace, etc.
export default (message, error) => {
  console.error('Logger error: ', JSON.stringify(message), error);
};
