// pages/api/now-playing.ts
"use client";

import type { NextApiRequest, NextApiResponse } from "next";

const SPOTIFY_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const ACCESS_TOKEN = process.env.SPOTIFY_ACCESS_TOKEN; // put your token in .env.local

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(SPOTIFY_URL, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  const data = await response.json();

  const track = {
    isPlaying: data.is_playing,
    title: data.item.name,
    artist: data.item.artists.map((a: any) => a.name).join(", "),
    album: data.item.album.name,
    albumImageUrl: data.item.album.images[0].url,
    songUrl: data.item.external_urls.spotify,
  };

  res.status(200).json(track);
}
