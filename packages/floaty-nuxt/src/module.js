import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "@seo-ny/floaty-nuxt",
    configKey: "floaty",
    compatibility: {
      nuxt: "^3.0.0"
    }
  },
  defaults: {
    prefix: "Floaty"
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    // 플러그인 추가
    addPlugin({
      src: resolve("./runtime/plugin"),
      options
    });

    // 자동 import 설정
    nuxt.hook("autoImports:dirs", (dirs) => {
      dirs.push(resolve("./runtime/composables"));
    });

    // 컴포넌트 디렉토리 설정
    nuxt.hook("components:dirs", (dirs) => {
      dirs.push({
        path: resolve("./runtime/components"),
        prefix: options.prefix
      });
    });
  }
});
