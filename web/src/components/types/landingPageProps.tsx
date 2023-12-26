interface LandingPageProps {
  enableBirthdate: boolean;
  enableRegionProvinceCountry: boolean;
  enableAddressNumber: boolean;
  enableCardholderInfo: boolean;
  donationType: string;
  maxAmount: number;
  minAmount: number;
  amounts: Array<{ label: string; value: number }>;
  title: string;
  subtitle: string;
  descText: string;
  formTitle: string;
  formSubtitle: string;
  backgroundImage: string;
}

export default LandingPageProps;
