import { View } from "react-native";
import SharedDetailsCustomerCard from "./SharedDetailsCustomerCard";
import SharedDetailsServiceCard from "./SharedDetailsServiceCard";
import SharedOtherServices from "./SharedOtherServices";
import SummaryServices from "./SummaryServices";

const SharedDetailsReservation = ({ data, note }) => {
  const { service, user, description, otherServices } = data;
console.log("otherServices",otherServices)
  return (
    <View>
      {otherServices?.length > 0 && (
        <SharedDetailsCustomerCard
          user={user}
          note={note || description}
          otherServices={otherServices}
        />
      )}
      {otherServices?.length === 0 && (
        <SharedDetailsCustomerCard user={user} note={note || description} />
      )}
      {otherServices?.length === 0 && (
        <SharedDetailsServiceCard data={service} />
      )}
      {otherServices?.length > 0 &&
        otherServices?.map((item) => <SharedOtherServices data={service}  key={item?.service?._id || item?.service?.id}/>)}

      {otherServices?.length > 0 &&
        otherServices?.map((item) => (
          <SharedOtherServices data={item.service} key={item?.service?._id || item?.service?.id} />
        ))}
      {otherServices?.length > 0 && (
        <SummaryServices service={service} data={otherServices}  />
      )}
    </View>
  );
};

export default SharedDetailsReservation;
