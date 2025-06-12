import { defineNuxtPlugin } from "#app";
import { setupPosition } from "@seo-ny/floaty-core";
import { computeWithBehaviors, offset } from "@seo-ny/floaty-core";
import { elementUtils, rectUtils, placementUtils } from "@seo-ny/floaty-core";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      floaty: {
        setupPosition,
        computeWithBehaviors,
        offset,
        elementUtils,
        rectUtils,
        placementUtils
      }
    }
  };
});
