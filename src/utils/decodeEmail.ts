export default function decodeEmail(encodedString: string): string {
    // Split the input string on '='
    const [base64Part, domainPart] = encodedString.split('=');

    // Decode the Base64 string
    const decodedEmail = atob(base64Part);

    // Find the index of '@' to insert the domain part
    const atIndex = decodedEmail.indexOf('@');
    if (atIndex === -1) {
        throw new Error("Invalid email format");
    }

    // Inject the domain part before the '@'
    const modifiedEmail = decodedEmail.slice(0, atIndex) + '+' + domainPart + decodedEmail.slice(atIndex);

    return modifiedEmail;
}
