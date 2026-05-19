# aircal-lp

aircal の DL ランディングページ。Astro 製、GitHub Pages 配信。

## 構成

- フレームワーク: [Astro](https://astro.build/)（v5）
- 多言語: 日本語（`/`）/ English（`/en/`）
- ホスティング: GitHub Pages（`g-session/aircal-lp`）
- 公開 URL: <https://g-session.github.io/aircal-lp/>

## 開発

```bash
npm install
npm run dev      # http://localhost:4321/aircal-lp/
npm run build    # dist/ にビルド
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
├── i18n/         # 文言辞書（ja / en）
├── pages/        # / (ja), /en/
└── styles/       # global.css
public/
├── images/
│   ├── app-icon.png
│   └── screenshots/    # 01-month.png ... 05-widget.png
└── favicon.svg
```

## 文言の更新

`src/i18n/index.ts` の `ja` / `en` オブジェクトを編集してください。
