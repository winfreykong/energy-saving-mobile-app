export type PricingPlan = {
    timeRange: string;
    price: string;
    pricingType: string;
  };
  
  export type PricingPlans = {
    [planName: string]: PricingPlan[];
  };   