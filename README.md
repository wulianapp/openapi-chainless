# openapi@chainless



One-tap login plugin for React Native using deep linking between apps.
![icon_01](./src/assets/icon_01.png)

## 功能简介

`openapi@chainless` 是一个基于 App 间 deep link 唤起的 React Native 一键登录插件，适用于需要在多个 App 之间安全快捷传递登录凭证的场景。

- 支持一键唤起第三方授权 App 并回传 Code
- 支持自定义 Modal 提示未安装授权 App 时的用户引导
- 支持监听其他 App 通过 URL Scheme 拉起本 App 并获取参数
- 兼容 React Native 生态，API 简单易用

## 安装

```sh
npm install openapi@chainless
# 或
yarn add openapi@chainless
# 或
pnpm add openapi@chainless
```

---

## 使用方法

### 1. 主动唤起授权 App 并处理未安装弹窗

```tsx
import React from 'react';
import { Button, View } from 'react-native';
import { useLaunchAuthApp } from 'openapi@chainless';

export default function Demo() {
  const { launch, modal } = useLaunchAuthApp({
    clientId: 'your-client-id',
    onDeepLink: (url, params) => {
      // 监听到被其他App拉起时的链接和参数
      console.log('被拉起的链接:', url);
      console.log('参数:', params);
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <Button title="一键登录" onPress={launch} />
      {modal}
    </View>
  );
}
```

### 2. 监听被其他 App 拉起时的链接

只需在 `useLaunchAuthApp` 传入 `onDeepLink` 回调即可自动监听，无需额外配置。

---

## API 说明

### useLaunchAuthApp(options)

| 参数         | 类型                                               | 说明                         |
| ------------ | -------------------------------------------------- | ---------------------------- |
| clientId     | string                                            | 唤起授权 App 时传递的 clientId|
| onDeepLink   | (url: string, params: Record<string, string>) => void | 监听被其他 App 拉起时的回调   |

返回值：
- `launch`: () => void 主动唤起授权 App
- `modal`: ReactNode 未安装授权 App 时的弹窗组件

---

## 注意事项

- 请确保你的 App 已正确配置 URL Scheme（deep link）能力。
- `clientId` 需与授权 App 约定一致。
- 若需自定义弹窗样式，可修改 `AuthAppModal.tsx`。
- 兼容 React Native 0.60+，如遇类型或编译问题请检查 tsconfig 配置。

---

## License

MIT
