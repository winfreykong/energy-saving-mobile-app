import { PricingPlans } from "@/src/types";

type PricingRange = {
  timeRange: string;
  price: string;
  pricingType: string;
  specificMonths?: string[]; // Optional column for specific months
};

type DayRanges = {
  weekdays: PricingRange[];
  weekendsAndHolidays: PricingRange[];
};

export const pricingPlans: Record<string, DayRanges> = {
  'TOU-DR1': {
    weekdays: [
      { timeRange: '00:00-06:00', price: '$', pricingType: "Super Off-Peak" },
      { timeRange: '06:00-10:00', price: '$$', pricingType: "Off-Peak" },
      { timeRange: '10:00-14:00', price: '$', pricingType: "Super Off-Peak", specificMonths: ["March", "April"] },
      { timeRange: '10:00-14:00', price: '$$', pricingType: "Off-Peak" }, // Other months
      { timeRange: '14:00-16:00', price: '$$', pricingType: "Off-Peak" },
      { timeRange: '16:00-21:00', price: '$$$', pricingType: "On-Peak" },
      { timeRange: '21:00-00:00', price: '$$', pricingType: "Off-Peak" }
    ],
    weekendsAndHolidays: [
      { timeRange: '00:00-14:00', price: '$', pricingType: "Super Off-Peak" },
      { timeRange: '14:00-16:00', price: '$$', pricingType: "Off-Peak" },
      { timeRange: '16:00-21:00', price: '$$$', pricingType: "On-Peak" },
      { timeRange: '21:00-00:00', price: '$$', pricingType: "Off-Peak" }
    ]
  },
  'TOU-DR2': {
    weekdays: [
      { timeRange: '00:00-16:00', price: '$$', pricingType: "Off-Peak" },
      { timeRange: '16:00-21:00', price: '$$$', pricingType: "On-Peak" },
      { timeRange: '21:00-00:00', price: '$$', pricingType: "Off-Peak" }
    ],
    weekendsAndHolidays: [
      { timeRange: '00:00-16:00', price: '$$', pricingType: "Off-Peak" },
      { timeRange: '16:00-21:00', price: '$$$', pricingType: "On-Peak" },
      { timeRange: '21:00-00:00', price: '$$', pricingType: "Off-Peak" }
    ]
  },
  'TOU-DR-P': {
    weekdays: [
      { timeRange: '00:00-06:00', price: '$', pricingType: "Super Off-Peak" },
      { timeRange: '06:00-10:00', price: '$$', pricingType: "Off-Peak" },
      { timeRange: '10:00-16:00', price: '$', pricingType: "Super Off-Peak", specificMonths: ["March", "April"] },
      { timeRange: '10:00-16:00', price: '$$', pricingType: "Off-Peak" }, // Other months
      { timeRange: '16:00-21:00', price: '$$$', pricingType: "On-Peak" },
      { timeRange: '16:00-21:00', price: '$$$$', pricingType: "Reduce Your Use" },
      { timeRange: '21:00-00:00', price: '$$', pricingType: "Off-Peak" }
    ],
    weekendsAndHolidays: [
      { timeRange: '00:00-14:00', price: '$', pricingType: "Super Off-Peak" },
      { timeRange: '14:00-16:00', price: '$$', pricingType: "Off-Peak" },
      { timeRange: '16:00-21:00', price: '$$$', pricingType: "On-Peak" },
      { timeRange: '16:00-21:00', price: '$$$$', pricingType: "Reduce Your Use" },
      { timeRange: '21:00-00:00', price: '$$', pricingType: "Off-Peak" }
    ]
  }
};

