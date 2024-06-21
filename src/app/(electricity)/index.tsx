import React from "react";
import { StyleSheet, FlatList, View, Dimensions } from "react-native";
import PricingPlanButton from "@/src/components/PricingPlanButton";
import { pricingPlans } from "@/assets/data/pricingPlans";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";

const { width } = Dimensions.get("window");
const buttonWidth = width - 60; // Adjust the width as needed

const index = () => {
  const dataToShow = Object.keys(pricingPlans);

  const renderFooter = () => (
    <View style={[{ width: buttonWidth }]}>
      <PricingPlanButton
        planName="Show All"
        showAll={true}
        buttonWidth={buttonWidth}
      />
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={dataToShow}
        renderItem={({ item }) => (
          <View style={[{ width: buttonWidth }]}>
            <PricingPlanButton
              planName={item}
              showAll={false}
              buttonWidth={buttonWidth}
            />
          </View>
        )}
        ListHeaderComponent={
          <ThemedText type="title" style={styles.headerText}>
            Should I do my laundries now?{"\n"}Choose your plan
          </ThemedText>
        }
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContentContainer}
        bounces={false}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  listContentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 5,
  },
});

export default index;
