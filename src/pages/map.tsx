import Page from "../components/page";

interface MapProp {
  onBack: () => void;
};

export default function Map({onBack}: MapProp) {
  return <Page onBack={onBack}>Todo: Mick</Page>
}