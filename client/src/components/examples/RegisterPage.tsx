import RegisterPage from "../RegisterPage";

export default function RegisterPageExample() {
  return (
    <RegisterPage
      onRegister={() => console.log("Register successful")}
      onBackToLogin={() => console.log("Back to login clicked")}
    />
  );
}
