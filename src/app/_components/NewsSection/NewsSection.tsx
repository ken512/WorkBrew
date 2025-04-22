"use client";
import React from 'react';
import "../../globals.css";

interface NewsItem {
  publishDate: string;
  updateDate: string;
  title: string;
  tags: string[];
}

const newsItems: NewsItem[] = [
  {
    publishDate: '2025/04/22',
    updateDate: '2025/04/22',
    title: 'WorkBrewをリリースしました!!',
    tags: ['Webアプリ関連']
  },
];

export const NewsSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 pb-2 border-b-2 border-gray-200">
          ニュース
        </h2>
        <div className="space-y-6">
          {newsItems.map((item, index) => (
            <article key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-2">
                <time className="flex items-center">
                  <span className="text-blue-600">●</span>
                  {item.publishDate}
                </time>
                <time className="flex items-center">
                  <span className="text-gray-400 ml-2">●</span>
                  {item.updateDate}
                </time>
              </div>
              <h3 className="text-lg font-medium mb-2">
                {item.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-block px-3 py-1 text-sm text-white bg-blue-600 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};