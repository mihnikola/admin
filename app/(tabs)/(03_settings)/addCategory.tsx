import withKeyboardAvoid from "@/wrapper/WrapperKeyboard";
import AddCategory from "../../../components/settings/services/components/AddCategory";

const addCategory = () => {
  return <AddCategory />;
};

export default withKeyboardAvoid(addCategory);