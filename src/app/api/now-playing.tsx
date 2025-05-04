// pages/api/now-playing.ts
"use client";

import type { NextApiRequest, NextApiResponse } from "next";

const SPOTIFY_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const ACCESS_TOKEN =
  "BQAAdrN2wMyGP_O68-OThPWOSdQp4GIBv80w9fu1TYJ5k3atpfCtk93R9D-YE1qmARiIwxVtqyRpOGQt49TOzMW1YqtYaQETHXlwWct7Dp6xMCA-odw5cxI7bfybL-tglKNapdt7le253JI2eMrPTLRZF2OPsqYB3Ak71ljRXQDGmumllQQEaolhgot8m_HPKqiekZ7nKCuO9qSLpzwdI_nxjccl3VVDRmGaEZcNbFdA_dU";

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
