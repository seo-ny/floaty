# Floaty Nuxt

Floaty Nuxt Module

## Installation

```bash
npm install @seo-ny/floaty-nuxt
# or
yarn add @seo-ny/floaty-nuxt
# or
pnpm add @seo-ny/floaty-nuxt
```

## Usage

1. `nuxt.config.js`에 모듈 추가

```js
export default defineNuxtConfig({
  modules: ['@seo-ny/floaty-nuxt']
})
```

2. 모듈 사용

```vue
<template>
  <div ref="target">
    <button @click="show">Show Floaty</button>
  </div>
</template>

<script setup>
const { $floaty } = useNuxtApp()
const target = ref(null)

const show = () => {
  $floaty.show({
    target: target.value,
    content: 'Hello from Floaty!'
  })
}
</script>
```

또는 컴포저블 사용

```vue
<script setup>
const floaty = useFloaty()
// Use floaty methods here
</script>
```
