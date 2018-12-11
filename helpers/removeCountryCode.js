export default function removeCountryCode(phoneNumber) {
  if (!phoneNumber) {
    return phoneNumber;
  }
  let phone = phoneNumber;
  /* eslint-disable */
  if (phoneNumber.indexOf('+966') === 0) {
    phone = phoneNumber.split('+966')[1];
  } else if (phoneNumber.indexOf('+020') === 0) {
    phone = phoneNumber.split('+020')[1];
  } else if (phoneNumber.indexOf('+20') === 0) {
    phone = phoneNumber.split('+20')[1];
  } else if (phoneNumber.indexOf('+91') === 0) {
    phone = phoneNumber.split('+91')[1];
  }
  /* eslint-enable */
  return phone;
}
