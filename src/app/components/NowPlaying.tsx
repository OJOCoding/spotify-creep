"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NowPlaying() {
  const { data, error } = useSWR("/api/now-playing", fetcher, {
    refreshInterval: 5000, // 5 seconds
  });

  if (error) return <div>Error loading</div>;

  if (!data || !data.isPlaying) {
    return (
      <div className="w-full max-w-md p-4 border rounded shadow bg-gray-100 animate-pulse">
        <div className="h-12 w-full bg-gray-300 mb-2 rounded" />
        <div className="h-6 w-3/4 bg-gray-300 rounded" />
      </div>
    );
  }

  return (
    <a href={data.songUrl} target="_blank" rel="noopener noreferrer">
      <div className="flex items-center space-x-4 border p-4 rounded shadow max-w-md">
        <img
          src={data.albumImageUrl}
          alt="Album Art"
          className="w-16 h-16 rounded object-cover"
        />
        <div>
          <p className="font-semibold">{data.title}</p>
          <p className="text-sm text-gray-600">{data.artist}</p>
        </div>
      </div>
    </a>
  );
}
