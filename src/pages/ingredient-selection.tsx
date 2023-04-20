import Page from "../components/page";

interface IngredientSelectionProp {
  onNext: () => void;
  onBack: () => void;
};

export default function IngredientSelection({onNext, onBack}: IngredientSelectionProp) {
  return <Page onNext={onNext} onBack={onBack}>
    TODO Select Ingredient
  </Page>;
}