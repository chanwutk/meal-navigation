import Page from "../components/page";

interface MealSelectionProp {
  onNext: () => void;
  onBack: () => void;
};

export default function MealSelection({onBack, onNext}: MealSelectionProp) {
  return <Page onNext={onNext} onBack={onBack}>
    TODO: Xinyuan please look at src/pages/meal-selection.tsx
  </Page>;
}