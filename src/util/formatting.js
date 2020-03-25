const camelCaseToSentenceCase = string => {
    let finalResult = ''
    if (string && string.length) {
        let result = string.replace( /([A-Z])/g, " $1" );
        finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    }
    return finalResult
}

/**
 * Source: https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case/37041217
 * @param {*} str 
 */
const camelize = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

export {
    camelCaseToSentenceCase,
    camelize
}