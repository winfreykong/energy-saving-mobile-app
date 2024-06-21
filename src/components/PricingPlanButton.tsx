import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "./Button";
import { useRouter } from "expo-router";

type PricingPlanButtonProps = {
  planName: string;
  showAll: boolean;
  buttonWidth: number;
};

export default function PricingPlanButton({
  planName,
  showAll,
  buttonWidth,
}: PricingPlanButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: `[plan]`,
      params: { showAll: showAll ? "true" : "false", planName },
    });
  };

  return (
    <View style={[{ width: buttonWidth }]}>
      <Button
        text={showAll ? "I am not sure, show me all" : planName}
        onPress={handlePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
  },
});
