import withKeyboardAvoid from "@/wrapper/WrapperKeyboard";
import ClientReservation from './../../../components/clients/ClientReservation';

import React from "react";

const client = () => {
  return <ClientReservation />;
};
export default withKeyboardAvoid(client);
