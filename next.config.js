/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'zfocwafabqrcbmxvzufa.supabase.co' // あなたのSupabaseプロジェクトのドメインを追加
    ],
  },
  // 他の設定がある場合はそのまま残す
}

module.exports = nextConfig 