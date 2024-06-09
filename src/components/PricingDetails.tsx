import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import moment from "moment-timezone";
import { PricingPlan, PricingPlans } from "../types";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

type PricingDetailsProps = {
  selectedPlan: string;
  pricingPlans: PricingPlans;
};

export default function PricingDetails({
  selectedPlan,
  pricingPlans,
}: PricingDetailsProps) {
  const [currentPrice, setCurrentPrice] = useState<string>("");
  const [pricingType, setPricingType] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    if (selectedPlan && pricingPlans[selectedPlan]) {
      const updatePricingInfo = () => {
        const now = moment.tz(moment.tz.guess()).format("HH:mm");
        setCurrentTime(now);
        console.log(now);
        const plan = pricingPlans[selectedPlan];
        const currentTimeSlot = plan.find((slot) => {
          const [start, end] = slot.timeRange.split("-");
          const startTime = moment(start, "HH:mm");
          const endTime = moment(end, "HH:mm");
          const currentTime = moment(now, "HH:mm");

          if (endTime.isBefore(startTime)) {
            // Handle overnight time ranges (e.g., 21:00-06:00)
            return (
              currentTime.isAfter(startTime) || currentTime.isBefore(endTime)
            );
          } else {
            return currentTime.isBetween(startTime, endTime, null, "[)");
          }
        });
        console.log(currentTimeSlot);
        setCurrentPrice(currentTimeSlot ? currentTimeSlot.price : "$");
        setPricingType(
          currentTimeSlot ? currentTimeSlot.pricingType : "Unknown"
        );
      };

      updatePricingInfo();
      const interval = setInterval(updatePricingInfo, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [selectedPlan, pricingPlans]);

  return (
    <ThemedView>
      <ThemedText style={styles.detail}>Current Time: {currentTime}</ThemedText>
      <ThemedText style={styles.detail}>Pricing Type: {pricingType}</ThemedText>
      <ThemedText style={styles.detail}>
        Current Price: {currentPrice}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  detail: {
    fontSize: 18,
    marginVertical: 5,
  },
});
