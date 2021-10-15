export function getFormBody(params) {
  let formBody = [];
  for (let property in params) {
    let encondedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);
    formBody.push(encondedKey + "=" + encodedValue);
  }
  return formBody.join("&");
}
