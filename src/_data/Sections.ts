export type Section = {
  title: string;
  description:{
    heading: string; // h2に表示する部分
    paragraph: string; // pに表示する部分
  }
  image: string;
}

// データ定義
export const Sections: Section[] = [
  {
    title: "WorkBrewとは？",
    description:{
      heading: "ユーザーがカフェ情報共有・探索し、\n作業効率を記録・分析できる便利なプラットフォーム",
      paragraph: "",
    },
    image: "/images/what-is-workbrew.png",
  },
  {
    title: "WorkBrewの特徴",
    description: {
      heading:"カフェ情報の登録と共有",
      paragraph:"作業記録の管理が簡単に行えます！"
    },
    image: "/images/features.png",
  },
  {
    title: "WorkBrewの使い方",
    description: {
    heading:"カフェ情報の検索と登録",
    paragraph: "作業パフォーマンスの追跡が可能です。",
    },
    image: "/images/how-to-use.png",

  },
];

