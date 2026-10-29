# 実装計画書: FAQサイト — ロゴ追加・テーマカラー変更・ダークテーマ対応

## 基本情報

* 仕様書: 20261029-faq-logo-darktheme-spec.md
* 作成日時: 2026-10-29T14:47:05+09:00
* 更新日時: 2026-10-29T14:48:27+09:00
* 作成者: IBM Bob
* ステータス: Approved

## 変更ファイル一覧

| ファイル | 変更種別 | 変更概要 |
|---|---|---|
| `faq/index.html` | 修正 | ヘッダー構成変更（ロゴ・リンク・ダークテーマトグルボタンの追加） |
| `faq/style.css` | 修正 | アクセントカラー変更、ヘッダーflexboxレイアウト追加、ダークテーマ用CSS変数追加 |
| `faq/script.js` | 修正 | ダークテーマ切替・設定保存・復元ロジックの追加 |

## 実装手順

### 手順1: `faq/style.css` の変更

1. `:root` 内の `--color-accent` を `#0f62fe` に変更する
2. `:root` 内の `--color-accent-dark` を `#0043ce` に変更する
3. `:root` 内の `--color-btn-active-bg` を `#0f62fe` に変更する
4. `.site-header` にflexboxレイアウトを追加する（`display: flex; align-items: center; justify-content: space-between`）
5. ヘッダーロゴ（`.header-logo`）のスタイルを追加する（高さ40px、縦中央揃え）
6. ヘッダータイトルエリア（`.header-title`）のスタイルを追加する（中央寄せ）
7. ダークテーマトグルボタン（`.theme-toggle`）のスタイルを追加する
8. `[data-theme="dark"]` セレクタでダーク用CSS変数を定義する
9. `@media (prefers-color-scheme: dark)` でフォールバック用ダーク変数を定義する（`data-theme` 未設定時のみ）

### 手順2: `faq/index.html` の変更

1. `.site-header` の中身を以下の構成に変更する：
   - 左端: Bob画像（`../bob.svg`）を `<a>` タグで囲んだロゴ要素（クラス: `header-logo`）
   - 中央: 既存タイトルとサブタイトルを `<div class="header-title">` で囲む
   - 右端: ダークテーマトグルボタン（`<button class="theme-toggle" aria-label="ダークテーマ切替">🌙</button>`）

### 手順3: `faq/script.js` の変更

1. ファイル先頭に以下のダークテーマ初期化処理を追加する：
   - `localStorage` からテーマ設定を読み込む（キー: `faq-theme`）
   - 設定があれば `<html>` に `data-theme` 属性を適用する
2. トグルボタンのクリックイベントを追加する：
   - 現在のテーマを判定し、`dark` ↔ `light` を切り替える
   - `<html>` の `data-theme` 属性を更新する
   - ボタンの絵文字（🌙 / ☀️）を更新する
   - `localStorage` に設定を保存する

## GUI実装

* **対象コンポーネント:** `faq/index.html` のヘッダー部分（`.site-header`）
* **スタイル:** CSSのCSS変数（`:root`）でカラー管理、`[data-theme="dark"]` でダーク時の上書き
* **状態管理:** `<html>` 要素の `data-theme` 属性で現在テーマを管理、`localStorage` で永続化
* **画面遷移:** ダークテーマ切替は即時反映（リロード不要）
* **レスポンシブ対応:** 768px以下でも画像・ボタンが適切に収まるよう調整

## テストの追加・更新

自動テストは既存になし。以下を手動で確認する：

1. ブラウザでFAQサイトを開き、Bob画像が左上に表示されること
2. Bob画像クリックで `https://www.ibm.com/products/bob` が新しいタブで開くこと
3. 🌙 ボタンクリックでダークテーマに切替わること
4. ☀️ ボタンクリックでライトテーマに切替わること
5. ページリロード後もテーマが保持されること
6. 既存の検索・カテゴリ・アコーディオンが正常に動作すること
7. 768px以下でレイアウトが崩れないこと

## 検証計画

* ブラウザ（Chrome）でローカルWebサーバー経由（または `file://`）にて目視確認
* DevToolsでレスポンシブ（768px以下）確認
* DevToolsのlocalStorageでテーマ保存を確認

## 移行・ロールバック

* 変更対象は3ファイルのみ
* git で管理されているため `git checkout` で元に戻せる

## 未解決事項

* `file://` プロトコルでの `../bob.svg` 参照はブラウザのセキュリティ設定によっては表示されない場合がある（Webサーバー経由では問題なし）
