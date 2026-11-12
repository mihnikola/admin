import ConfirmReservation from "@/app/(add_reservation)/confirmReservation";
import withKeyboardAvoid from "@/wrapper/WrapperKeyboard";

const confirmReservation = () => {
    return <ConfirmReservation />;
};

export default withKeyboardAvoid(confirmReservation);
