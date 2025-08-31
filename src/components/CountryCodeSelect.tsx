import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const countryCodes = [
  { code: "+1", country: "US/CA", flag: "🇺🇸", example: "555 123 4567" },
  { code: "+44", country: "UK", flag: "🇬🇧", example: "7700 900123" },
  { code: "+91", country: "India", flag: "🇮🇳", example: "9876 543210" },
  { code: "+92", country: "Pakistan", flag: "🇵🇰", example: "300 1234567" },
  { code: "+86", country: "China", flag: "🇨🇳", example: "138 0013 8000" },
  { code: "+81", country: "Japan", flag: "🇯🇵", example: "90 1234 5678" },
  { code: "+49", country: "Germany", flag: "🇩🇪", example: "30 12345678" },
  { code: "+33", country: "France", flag: "🇫🇷", example: "6 12 34 56 78" },
  { code: "+39", country: "Italy", flag: "🇮🇹", example: "312 345 6789" },
  { code: "+34", country: "Spain", flag: "🇪🇸", example: "612 34 56 78" },
  { code: "+7", country: "Russia", flag: "🇷🇺", example: "912 345 67 89" },
  { code: "+55", country: "Brazil", flag: "🇧🇷", example: "11 91234 5678" },
  { code: "+52", country: "Mexico", flag: "🇲🇽", example: "55 1234 5678" },
  { code: "+61", country: "Australia", flag: "🇦🇺", example: "412 345 678" },
  { code: "+82", country: "South Korea", flag: "🇰🇷", example: "10 1234 5678" },
  { code: "+65", country: "Singapore", flag: "🇸🇬", example: "8123 4567" },
  { code: "+971", country: "UAE", flag: "🇦🇪", example: "50 123 4567" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦", example: "50 123 4567" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾", example: "12 345 6789" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩", example: "812 3456 789" },
];

export { countryCodes };

interface CountryCodeSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  onExampleChange?: (example: string) => void;
}

const CountryCodeSelect = ({ value, onValueChange, onExampleChange }: CountryCodeSelectProps) => {
  const handleValueChange = (newValue: string) => {
    onValueChange(newValue);
    const selectedCountry = countryCodes.find(country => country.code === newValue);
    if (selectedCountry && onExampleChange) {
      onExampleChange(selectedCountry.example);
    }
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[140px] bg-input/50 border-card-border">
        <SelectValue placeholder="+92" />
      </SelectTrigger>
      <SelectContent>
        {countryCodes.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            <div className="flex items-center gap-2">
              <span>{country.flag}</span>
              <span>{country.code}</span>
              <span className="text-muted-foreground text-xs">({country.country})</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CountryCodeSelect;