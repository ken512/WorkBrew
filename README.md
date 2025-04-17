# 開発者向けの情報

### 前提条件

- Node.js (v20.17 以上)
- npm (v10.9 以上)
- Git (v2.46 以上)

## ローカルサーバー起動

```bash
npm run dev
```

サーバー起動後、http://localhost:3000 でアプリにアクセスできます。

<br />


## 環境変数設定
- プロジェクトのルートディレクトリに `.env` ファイルを作成
- 必要な環境変数の取得については管理者にリクエスト
- 取得した環境変数を `.env` ファイルに設定

<br />
<br />


# 利用者向け

![alt text](</docs/img/workbrew.png>)

<br />

このWEBアプリは、ユーザーがカフェ情報共有・探索し、作業効率を記録・分析できる便利なプラットフォーム

<br />



## サービスのURL
ゲストログインから登録無しで、全ての機能が試せます。お気軽にお試しください。(ユーザーアカウント登録必須)

<br />


## サービス開発の経緯
私はカフェが好きで、休日によくカフェで作業や勉強をすることが多く、「空席状況」や「電源・Wi-Fiの有無」「Wi-Fiの速度と安定性」といった情報の重要性を日々感じていました。
事前に調べてから訪れても、実際に行ってみたら電源が無かったり、空いているかどうかわからなかったりと、現地で困るケースは少なくありませんでした。
こうした課題をきっかけに、「作業環境に関するリアルな情報を、ユーザー同士で情報を共有できるサービスがあると便利のではないか」と考えました。
空席状況やWi-Fiの品質など、作業環境に特化した情報を投稿・閲覧できる仕組みにすることで、ノマドワーカーやフリーランスが快適に作業場所を見つけられる体験を提供するサービスを開発しました。

<br />
<br />


## 機能一覧


| トップ画面 | ゲストログイン画面 |
| ---------- | ------------------ |
| <img src="/docs/img/トップ画面.png" width="500" height="300"/> | <img src="/docs/img/guestLogin.png" width="500" height="300"/> |
| <div style="width:500px">LP構成で、サービス内容をわかりやすく伝えます。</div> | <div style="width:500px">ゲストログインで、登録なしですぐ体験できます。</div> |

| カフェ投稿画面 | 投稿一覧画面 |
| -------------- | ------------ |
| <img src="/docs/img/カフェ投稿.png" width="500" height="300"/> | <img src="/docs/img/投稿一覧.png" width="500" height="300"/> |
| <div style="width:500px">必要最小限の情報で手軽にカフェを投稿できます。</div> | <div style="width:500px">店名・エリア・設備の絞り込み検索が可能です。</div> |

| カフェ詳細画面 | ユーザーアカウント画面 |
| -------------- | ---------------------- |
| <img src="/docs/img/カフェ詳細.png" width="500" height="300"/> | <img src="/docs/img/ユーザーアカウント.png" width="500" height="300"/> |
| <div style="width:500px">地図とリアルタイムなWi‑Fi・空席状況を確認できます。</div> | <div style="width:500px">登録で投稿・お気に入り機能を利用可能になります。</div> |

| お気に入り一覧画面 | ホーム画面 |
| ------------------ | ---------- |
| <img src="/docs/img/お気に入り一覧.png" width="500" height="300"/> | <img src="/docs/img/ホーム画面.png" width="500" height="300"/> |
| <div style="width:500px">気になるカフェをブックマークして保存できます。</div> | <div style="width:500px">最新＆高評価カフェを効率的に探せます。</div> |



<br />



# 使用技術

## フロントエンド
- 言語：TypeScript
- フレームワーク：Next.js 14.2.3(App Router)
- スタイル：tailwind
- データfetch：SWR

## バックエンド
- 言語：TypeScript
- フレームワーク：Next.js 14.2.3(App Router)
- データベース: PostgreSQL (Supabase Database)
- ORM: Prisma
- 認証: Supabase Auth
- ストレージ: Supabase Storage

## 開発環境・インフラ
- IDE: Visual Studio Code
- ホスティング: Vercel
- バージョン管理: Git, GitHub
- デザインカンプ: Figma
- ER図：Miro

<br />



## システム構成図

![システム構成図](/docs/img/system.png)

<br />


## ER図

![ER図](/docs/img/WorkBrewER図.jpg)
[ER図](https://miro.com/app/board/uXjVL4Vn3DQ=/?share_link_id=15995754300)

<br />
<br />

## 今後の展望

今後の展望アイディアは以下の通りです。
  
1. 機能アップデート
- 最新情報を知らせる通知機能。
- 作業ログの記録と分析の機能。

2. パフォーマンスの最適化
- ユーザーにとって快適なサービスにするため、レスポンスの短縮化、データの読み込み速度や処理速度の向上を今後実施する。