import { Parser } from 'xml2js';

/**
 * Converts the provided XML string to JSON.
 * @param {string} xml 
 * @returns {Object}
 */
export function xml2json(xml) {
  var parser = new Parser();
  let json;
  parser.parseString(xml, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    return json = result;
  });
  return json;
}