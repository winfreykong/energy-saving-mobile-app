import React from "react";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import PricingDetails from "@/src/components/PricingDetails";
import { pricingPlans } from "@/assets/data/pricingPlans";
import { ThemedView } from "@/src/components/ThemedView";

export default function PlanDetails() {
  const { planName } = useLocalSearchParams<{ planName: string }>();

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: planName }} />
      <PricingDetails selectedPlan={planName} pricingPlans={pricingPlans} />
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
