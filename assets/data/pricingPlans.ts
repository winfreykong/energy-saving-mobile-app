import { PricingPlans } from "@/src/types";

export const pricingPlans: PricingPlans = {
  'TOU-DR1​': [
    { timeRange: '00:00-06:00', price: '$', pricingType: "Super Off-Peak"},
    { timeRange: '06:00-10:00', price: '$$', pricingType: "Off-Peak" },
    { timeRange: '10:00-14:00', price: '$', pricingType: "Off-Peak"},
    { timeRange: '14:00-16:00', price: '$$', pricingType: "Off-Peak"},
    { timeRange: '16:00-21:00', price: '$$$', pricingType: "Super On-Peak"},
    { timeRange: '21:00-00:00', price: '$$', pricingType: "Super Off-Peak" }
  ],
  'TOU-DR2': [
    { timeRange: '00:00-08:00', price: '$', pricingType: "Super Off-Peak" },
    { timeRange: '08:00-12:00', price: '$$', pricingType: "On-Peak" },
    { timeRange: '12:00-18:00', price: '$$$', pricingType: "On-Peak"  },
    { timeRange: '18:00-00:00', price: '$$', pricingType: "Off-Peak"  }
  ],
  // Add more plans as needed
};
