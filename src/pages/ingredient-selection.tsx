import Page from "../components/page";

interface IngredientSelectionProp {
  onNext: () => void;
  onBack: () => void;
};

export default function IngredientSelection({onNext, onBack}: IngredientSelectionProp) {
  return <Page onNext={onNext} onBack={onBack}>
    TODO: Sunny please look at src/pages/ingredient-selection.tsx
  </Page>;
}