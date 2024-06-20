import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import moment from "moment-timezone";
import { pricingPlans } from "@/assets/data/pricingPlans";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import GaugeChart from "./GaugeChart";

type PricingDetailsProps = {
  selectedPlan: string;
};

const holidays = [
  "01-01", // New Year's Day
  "02-20", // President's Day
  "05-29", // Memorial Day
  "07-04", // Independence Day
  "09-04", // Labor Day
  "11-11", // Veterans Day
  "11-23", // Thanksgiving Day
  "12-25", // Christmas Day
];

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

export default function PricingDetails({ selectedPlan }: PricingDetailsProps) {
  const [currentPrices, setCurrentPrices] = useState<
    { price: string; pricingType: string }[]
  >([]);
  const [maxPrice, setMaxPrice] = useState(5);

  useEffect(() => {
    if (selectedPlan && pricingPlans[selectedPlan]) {
      const updatePricingInfo = () => {
        // Hardcoded date and time for testing
        // const testDate = "2024-01-01T20:30:00";
        // const now = moment.tz(testDate, moment.tz.guess());

        // Use the following line to get the current date and time
        const now = moment.tz(moment.tz.guess());

        const currentMonth = now.format("MMMM");
        const dayOfWeek = now.day();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isHolidayToday = isHoliday(now);

        const plan = pricingPlans[selectedPlan];
        const dayType =
          isWeekend || isHolidayToday ? "weekendsAndHolidays" : "weekdays";

        const applicableRanges = plan[dayType].filter((range) => {
          if (range.price.length > maxPrice) {
            setMaxPrice(range.price.length);
          }
          const [start, end] = range.timeRange.split("-");
          const startTime = moment(now)
            .startOf("day")
            .add(moment.duration(start));
          const endTime = moment(now).startOf("day").add(moment.duration(end));

          if (endTime.isBefore(startTime)) {
            // Handle overnight time ranges (e.g., 21:00-06:00)
            return now.isAfter(startTime) || now.isBefore(endTime);
          } else {
            return now.isBetween(startTime, endTime, null, "[)");
          }
        });

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
    }
  }, [selectedPlan]);

  return (
    <ThemedView>
      {currentPrices.map((priceInfo, index) => (
        <React.Fragment key={index}>
          <ThemedView style={styles.detailContainer}>
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
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <ThemedText style={styles.separatorText}>OR</ThemedText>
              <View style={styles.separatorLine} />
            </View>
          )}
        </React.Fragment>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  gaugeContainer: {
    marginBottom: 70, // Add space between the gauge and the texts
  },
  detailContainer: {
    marginVertical: 50,
  },
  detail: {
    fontSize: 18,
    marginVertical: 5,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#999",
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 18,
    color: "#999",
  },
});
