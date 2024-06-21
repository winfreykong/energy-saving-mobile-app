import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import moment from "moment-timezone";
import { pricingPlans } from "@/assets/data/pricingPlans";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import GaugeChart from "./GaugeChart";
import { holidays } from "@/assets/data/holidays";

type PricingDetailsProps = {
  selectedPlan: string;
  showAll?: boolean;
};

const priceLabelMapping: { [key: number]: string } = {
  1: "Lowest",
  2: "Low",
  3: "Typical",
  4: "High",
  5: "Highest",
};

const getPriceLabel = (price: number) => {
  return priceLabelMapping[price] || "Unknown";
};

const isHoliday = (date: moment.Moment) => {
  const formattedDate = date.format("MM-DD");
  return holidays.includes(formattedDate);
};

export default function PricingDetails({
  selectedPlan,
  showAll = false,
}: PricingDetailsProps) {
  const [currentPrices, setCurrentPrices] = useState<
    { price: string; pricingType: string }[]
  >([]);
  const [maxPrice, setMaxPrice] = useState(5);

  useEffect(() => {
    const updatePricingInfo = () => {
      const now = moment.tz(moment.tz.guess());
      const currentMonth = now.format("MMMM");
      const dayOfWeek = now.day();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isHolidayToday = isHoliday(now);
      const dayType =
        isWeekend || isHolidayToday ? "weekendsAndHolidays" : "weekdays";

      let applicableRanges = [];

      if (showAll) {
        applicableRanges = Object.keys(pricingPlans).flatMap((planName) => {
          const plan = pricingPlans[planName];
          return plan[dayType].filter((range) => {
            if (range.price.length > maxPrice) {
              setMaxPrice(range.price.length);
            }
            const [start, end] = range.timeRange.split("-");
            const startTime = moment(now)
              .startOf("day")
              .add(moment.duration(start));
            const endTime = moment(now)
              .startOf("day")
              .add(moment.duration(end));

            if (endTime.isBefore(startTime)) {
              return now.isAfter(startTime) || now.isBefore(endTime);
            } else {
              return now.isBetween(startTime, endTime, null, "[)");
            }
          });
        });
      } else {
        const plan = pricingPlans[selectedPlan];
        applicableRanges = plan[dayType].filter((range) => {
          if (range.price.length > maxPrice) {
            setMaxPrice(range.price.length);
          }
          const [start, end] = range.timeRange.split("-");
          const startTime = moment(now)
            .startOf("day")
            .add(moment.duration(start));
          const endTime = moment(now).startOf("day").add(moment.duration(end));

          if (endTime.isBefore(startTime)) {
            return now.isAfter(startTime) || now.isBefore(endTime);
          } else {
            return now.isBetween(startTime, endTime, null, "[)");
          }
        });
      }

      const prices = applicableRanges.filter((range) => {
        if (range.specificMonths) {
          return range.specificMonths.includes(currentMonth);
        }
        return true;
      });

      setCurrentPrices(prices);
    };

    updatePricingInfo();
    const interval = setInterval(updatePricingInfo, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [selectedPlan, showAll]);

  if (currentPrices.length <= 1) {
    // Handle single plan case
    return (
      <View style={styles.singlePlanContainer}>
        {currentPrices.length === 0 ? (
          <ThemedText>No pricing information available.</ThemedText>
        ) : (
          currentPrices.map((priceInfo, index) => (
            <React.Fragment key={index}>
              <ThemedView style={styles.detailContainer}>
                <ThemedText style={styles.planName}>
                  Plan: {selectedPlan}
                </ThemedText>
                <ThemedView style={styles.gaugeContainer}>
                  <GaugeChart
                    value={priceInfo.price.length}
                    maxValue={maxPrice}
                    textDisplay={getPriceLabel(priceInfo.price.length)}
                  />
                </ThemedView>
                <ThemedText style={styles.detail}>
                  Pricing Type: {priceInfo.pricingType}
                </ThemedText>
                <ThemedText style={styles.detail}>
                  Current Price: {priceInfo.price}
                </ThemedText>
              </ThemedView>
            </React.Fragment>
          ))
        )}
      </View>
    );
  }

  // Handle multiple plans case
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      style={styles.scrollView}
    >
      <ThemedView style={styles.container}>
        {currentPrices.map((priceInfo, index) => (
          <React.Fragment key={index}>
            <ThemedView style={styles.detailContainer}>
              <ThemedText style={styles.planName}>
                Plan:{" "}
                {showAll ? Object.keys(pricingPlans)[index] : selectedPlan}
              </ThemedText>
              <ThemedView style={styles.gaugeContainer}>
                <GaugeChart
                  value={priceInfo.price.length}
                  maxValue={maxPrice}
                  textDisplay={getPriceLabel(priceInfo.price.length)}
                />
              </ThemedView>
              <ThemedText style={styles.detail}>
                Pricing Type: {priceInfo.pricingType}
              </ThemedText>
              <ThemedText style={styles.detail}>
                Current Price: {priceInfo.price}
              </ThemedText>
            </ThemedView>
            {index < currentPrices.length - 1 && (
              <ThemedView style={styles.separatorContainer}>
                <ThemedView style={styles.separatorLine} />
                <ThemedText style={styles.separatorText}>OR</ThemedText>
                <ThemedView style={styles.separatorLine} />
              </ThemedView>
            )}
          </React.Fragment>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  singlePlanContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    alignItems: "center",
  },
  gaugeContainer: {
    marginBottom: 70, // Add space between the gauge and the texts
  },
  detailContainer: {
    marginVertical: 50,
    width: "90%", // Ensure the container takes up most of the width
  },
  planName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center", // Ensure text is centered
  },
  detail: {
    fontSize: 18,
    marginVertical: 5,
    textAlign: "center", // Ensure text is centered
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  separatorLine: {
    width: "30%",
    height: 1,
    backgroundColor: "#999",
    marginHorizontal: 10, // Add margin to the left and right of the separator
  },
  separatorText: {
    fontSize: 18,
    color: "#999",
  },
});
