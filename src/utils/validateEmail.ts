export default function validateEmail(email: string): boolean {
  if (email.includes("@")) {
    if (email.substring(email.indexOf("@")).includes(".")) {
      return true;
    }
  }
  return false;
}
