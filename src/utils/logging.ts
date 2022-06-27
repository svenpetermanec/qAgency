export const devConsoleLog = (param?: any) => {
  process.env.NODE_ENV !== 'production' && console.log(param);
};

export const devConsoleError = (param?: any) => {
  process.env.NODE_ENV !== 'production' && console.error(param);
};
