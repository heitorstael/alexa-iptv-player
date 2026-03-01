import { IptvChannel } from "../types/playlist";

export async function fetchAndParseM3U(playlistUrl: string): Promise<IptvChannel[]> {
  try {
    const response = await fetch(playlistUrl);
    if (!response.ok) throw new Error('Unable to download playlist!');
    
    const textData = await response.text();
    const lines = textData.split('\n');
    const channels: IptvChannel[] = [];
    
    let currentChannel: Partial<IptvChannel> = {};

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line === '#EXTM3U') continue;

      if (line.startsWith('#EXTINF:')) {
        const logoMatch = line.match(/tvg-logo="([^"]+)"/);
        if (logoMatch) currentChannel.logo = logoMatch[1];

        const groupMatch = line.match(/group-title="([^"]+)"/);
        if (groupMatch) currentChannel.group = groupMatch[1];

        const commaIndex = line.lastIndexOf(',');
        if (commaIndex !== -1) {
          currentChannel.name = line.substring(commaIndex + 1).trim();
        }
      } else if (!line.startsWith('#')) {
        currentChannel.url = line;
        if (currentChannel.name && currentChannel.url) {
          channels.push(currentChannel as IptvChannel);
        }
        currentChannel = {}; 
      }
    }

    return channels;
  } catch (error) {
    console.error("Unable to load M3U: ", error);
    throw error;
  }
}