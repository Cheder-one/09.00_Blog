function removeInvisibleChar(inputString) {
  const regExp = /[\u3164\u200B-\u200D\uFEFF]/g;
  return inputString.replace(regExp, ' ');
}

export default removeInvisibleChar;
