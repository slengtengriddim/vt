isAlphabetic = value => {
  const filter = /^[A-Za-z\s]+$/;
  if (filter.test(value)) {
    return true;
  }
  return false;
};

isLength64 = value => {
  if (value.length < 65) {
    return true;
  }
  return false;
};
