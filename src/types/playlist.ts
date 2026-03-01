export interface IptvChannel {
  name: string;
  logo: string;
  group: string;
  url: string;
}

export type Playlist = {
  name: string;
  url: string;
  channels: IptvChannel[];
};