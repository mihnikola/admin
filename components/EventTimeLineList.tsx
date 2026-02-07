import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SharedCard from "@/shared-components/SharedCard";

const EventTimelineList = ({ events, isLoading, error }) => {
  console.log("events",events);
  if (error) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.errorMessage}>
          Error: {error.message || "Failed to load events."}
        </Text>
        <Text style={styles.errorMessageDetail}>
          Please check your connection and try again.
        </Text>
      </View>
    );
  }

  // Display message if no events found for the selected date
  if (!events || events.length === 0) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.noEventsText}>
          No events scheduled for this date.
        </Text>
      </View>
    );
  }

  // Render individual event item

  return (
    <View style={styles.list}>
      {isLoading && (
        <ActivityIndicator
          size={40}
          style={{ paddingVertical: 20 }}
          color="white"
        />
      )}
      {!isLoading && (
        <FlatList
          data={events}
          renderItem={({ item }) => <SharedCard item={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 2,
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: 150, // Give some minimum height for consistency
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: 150,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 5,
  },
  errorMessageDetail: {
    fontSize: 14,
    color: "#141313ff",
    textAlign: "center",
  },
  notWorkingDaysContent: {
    fontSize: 18,
    color: "gray", // Darker red for error/warning
    textAlign: "center",
    fontWeight: "bold",
  },
  noEventsText: {
    fontSize: 16,
    color: "#060606ff",
    textAlign: "center",
  },
  flatListContent: {
    paddingBottom: 20, // Space at the bottom of the list
  },
  eventItem: {
    flexDirection: "row",
    backgroundColor: "#161616ff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#161616ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  timeBlock: {
    width: 70, // Fixed width for time block
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#211f1fff",
    paddingRight: 15,
  },
  startTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  endTime: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  detailsBlock: {
    flex: 1, // Take remaining space
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 13,
    color: "#666",
    marginBottom: 5,
  },
  eventStatus: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  // Status-specific styles
  completed: {
    color: "green",
  },
  pending: {
    color: "orange",
  },
  "in-progress": {
    color: "blue",
  },
});

export default EventTimelineList;
