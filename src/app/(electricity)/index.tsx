import React from "react";
import { StyleSheet, FlatList } from "react-native";
import PricingPlanButton from "@/src/components/PricingPlanButton";
import { pricingPlans } from "@/assets/data/pricingPlans";
import { ThemedView } from "@/src/components/ThemedView";

const index = () => {
  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <FlatList
        data={Object.keys(pricingPlans)}
        renderItem={({ item }) => <PricingPlanButton planName={item} />}
        contentContainerStyle={styles.list}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 5,
  },
});

export default index;
