import withKeyboardAvoid from "@/wrapper/WrapperKeyboard";
import ChangePasswordComponent from "./../../components/login/ChangePasswordComponent"
const changePassword = () => {
  return (
    <ChangePasswordComponent />
  )
}

export default withKeyboardAvoid(changePassword);