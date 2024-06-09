import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "./Button";
import { useRouter } from "expo-router";
import { ThemedView } from "./ThemedView";

type PricingPlanButtonProps = {
  planName: string;
};

export default function PricingPlanButton({
  planName,
}: PricingPlanButtonProps) {
  const router = useRouter();

  return (
    // <ThemedView style={styles.buttonContainer}>
    <Button
      text={planName}
      onPress={() => router.push({ pathname: `[plan]`, params: { planName } })}
    />
    // </ThemedView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
});
