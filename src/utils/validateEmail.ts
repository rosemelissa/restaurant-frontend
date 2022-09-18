export default function validateEmail(email: string) {
    if (email.includes("@")) {
        if (email.substring(email.indexOf("@")).includes(".")) {
            return true;
        }
    }
    return false;
}