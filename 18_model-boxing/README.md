# 18_model-boxing

Next.js + React Three Fiber + Three.js WebGPU/TSL の実験プロジェクトです。

## ディレクトリ構成

```txt
18_model-boxing/
├── app/
├── public/
├── src/
│   ├── components/
│   ├── controls/
│   ├── scene/
│   ├── shaders/
│   └── state/
├── package.json
└── tsconfig.json
```

## 責務

- `app/`: Next.js App Router の入口。ルーティング、layout、global CSS を置く。
- `src/`: 実験本体。Next.js のルーティング層から切り離した実装を置く。
- `src/components/`: React の表示用コンポーネント。Three.js、Leva、Jotai、TSL 固有の処理は直接持たない。
- `src/controls/`: Leva の UI と control 定義。Jotai state への反映もここで扱う。
- `src/scene/`: Three.js / React Three Fiber の Canvas、Scene、Mesh、renderer 設定を置く。
- `src/shaders/`: TSL node や shader graph を置く。UI や Leva には依存させない。
- `src/state/`: Jotai の atom、派生 atom、状態操作 helper を置く。

## 開発

```bash
npm run dev
```

http://localhost:3000 を開いて確認します。
