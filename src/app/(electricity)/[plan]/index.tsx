import React from "react";
import { StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import PricingDetails from "@/src/components/PricingDetails";
import { ThemedView } from "@/src/components/ThemedView";

export default function PlanDetails() {
  const { planName, showAll } = useLocalSearchParams<{
    planName: string;
    showAll: boolean;
  }>();

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: "Details" }} />
      <PricingDetails selectedPlan={planName} showAll={showAll === "true"} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
