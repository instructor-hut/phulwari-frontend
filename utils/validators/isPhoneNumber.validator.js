export default function IsPhoneNumber(phoneNumber) {
    const indianMobileRegex = /^[6-9]\d{9}$/;

    return indianMobileRegex.test(phoneNumber);
}