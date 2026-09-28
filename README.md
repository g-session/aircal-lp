# aircal-lp

aircal の DL ランディングページ。Astro 製、GitHub Pages 配信。

## 構成

- フレームワーク: [Astro](https://astro.build/)（v5）
- 多言語: 25ロケール。日本語は `/`、その他は `/<locale>/`（お問い合わせは各 `/contact/`）
- ホスティング: GitHub Pages（`g-session/aircal-lp`）
- 公開 URL: <https://g-session.github.io/aircal-lp/>

対応ロケール: `ja`, `en`, `en-AU`, `en-CA`, `en-GB`, `ko`, `zh`, `zh-Hant-TW`, `zh-Hant-HK`, `es`, `pt`, `fr`, `de`, `id`, `it`, `vi`, `ru`, `pl`, `cs`, `nb`, `nl`, `sv`, `ms`, `hu`, `th`。

`src/i18n/locales.json` を Astro の locale 設定と言語メニューで共有しています。日本語と英語の基本文言は `src/i18n/index.ts`、20言語の翻訳は `src/i18n/translations.json`、英語地域版は `src/i18n/index.ts` 内の明示的な綴り分けで管理します。アクセスした言語へ自動転送はしません。

## 開発

```bash
npm install
npm run dev      # http://localhost:4321/aircal-lp/
npm run build    # dist/ にビルドし、出力を検証
npm run preview  # ビルド成果物をローカル確認
```

## デプロイ

`main` への push で `.github/workflows/deploy.yml` が走り、GitHub Pages に自動配信されます。

リポジトリ作成直後の初回のみ、GitHub UI で「Settings → Pages → Source: GitHub Actions」を選択する必要があります。

## ディレクトリ構成

```
src/
├── components/   # Header, Hero, FeatureSection, ...
├── layouts/      # Base.astro
├── i18n/         # locale registry, dictionaries, localized image paths
├── pages/        # / (ja), /[locale]/, /contact/, /[locale]/contact/
└── styles/       # global.css
public/
├── images/
│   ├── app-icon.png
│   ├── screenshots/    # 日本語の 01-month.png ... 05-widget.png
│   └── aso/            # 24ロケール × 6枚の ASO スクリーンショット（WebP）
└── favicon.svg
```

日本語ページは既存の PNG を使います。他の24ロケールは `public/images/aso/<locale>/` の `01-month`, `02-google`, `03-share`, `04-themes`, `05-widget`, `cover-left` を使います。横スクロール列の2枚目の `cover-right` は同じロケールの `01-month` を再利用します。ASO WebP はすべて 768 × 1662 ピクセルです。画像の対応は `src/i18n/assets.ts` にあります。元画像はDesktopへ書き出したものと同じ iPhone ASO 一式から取得し、`public/images/aso/manifest.json` に元ファイル名・SHA-256・書き出し寸法を記録しています。

## 文言の更新

`src/i18n/index.ts` の `ja` / `en` オブジェクトと `src/i18n/translations.json` の各 locale オブジェクトを編集してください。翻訳辞書の `features` は5件を保ちます。
