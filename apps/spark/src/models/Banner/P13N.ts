import {CmTeasable, P13NExperience} from "@coremedia-labs/graphql-layer";
import {usePreviewContextState} from "../../context/PreviewContextProvider";

export const getP13NTargets = (self: P13NExperience): Array<CmTeasable> => {
  const {previewP13NExperiences} = usePreviewContextState();
  const previewP13Variants = previewP13NExperiences && previewP13NExperiences.variants;
  // previewP13Variants can be set to 'baseline' (preview 'eye' usecase)
  let p13nVariants = self && self.variants && self.variants.slice();
  const baseline = self && self.baseline as CmTeasable;
  if (baseline) {
    p13nVariants?.push({id: 'baseline', target: baseline});
  }
  let p13nTargets = baseline && [baseline];
  if (previewP13Variants && p13nVariants) {
    p13nTargets = p13nVariants
      .filter((p13nVariant) => previewP13Variants.indexOf(p13nVariant.id) >= 0)
      .map((p13nVariant) => p13nVariant.target as CmTeasable);
  }
  //again when there are no variants left fallback to baseline
  if (p13nTargets.length === 0) {
    p13nTargets = baseline && [baseline];
  }
  return p13nTargets;
}
