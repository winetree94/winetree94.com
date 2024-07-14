export type WorkExperience = {
  companyName: string;
  country: string;
  position: string;
  period: string;
  main: string;
  projects: {
    title: string;
    description: string;
    period: string;
    goals: string[];
  }[];
};
