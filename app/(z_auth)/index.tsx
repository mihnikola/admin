import LoginScreen from "@/components/login";
import withKeyboardAvoid from "@/wrapper/WrapperKeyboard";
const Login = () => {
  return <LoginScreen />;
};

export default withKeyboardAvoid(Login);
