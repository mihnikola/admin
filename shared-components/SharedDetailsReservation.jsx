import { View } from "react-native";
import SharedDetailsCustomerCard from "./SharedDetailsCustomerCard";
import SharedDetailsServiceCard from "./SharedDetailsServiceCard";

const SharedDetailsReservation = ({ data, note }) => {
  const { service, user } = data;

  return (
    <View>
      <SharedDetailsServiceCard data={service} />
      <SharedDetailsCustomerCard user={user} note={note} />
    </View>
  );
};

export default SharedDetailsReservation;
