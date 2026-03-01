import type { Component } from 'solid-js';
import { onMount, createEffect, createSignal, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { createStore } from 'solid-js/store';

import { fetchAndParseM3U } from '../../services/playlist';

import { Playlist } from '../../types/playlist';

import styles from './LoadPlaylist.module.scss';

import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';

const LoadPlaylist: Component = () => {
  let m3u8Url!: HTMLInputElement;
  let playlistName!: HTMLInputElement;
  const navigate = useNavigate();

  const savedName = localStorage.getItem('iptv_playlist_name') || '';
  const savedUrl = localStorage.getItem('iptv_playlist_url') || '';

  const emptyPlaylist = {
    name: '',
    url: '',
    channels: []
  };

  const [playlist, setPlaylist] = createStore<Playlist>({
    name: savedName,
    url: savedUrl,
    channels: []
  });
  const [isLoading, setIsLoading] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal('');

  const goSelectStream = () => {
    navigate("/select-stream");
  };
  const removePlaylist = () => {
    m3u8Url.value = '';
    playlistName.value = '';
    for (const [key, value] of Object.entries(emptyPlaylist)) {
      setPlaylist(key as keyof Playlist, value);
    }
  };
  const handlePlaylist = async () => {
    if (!m3u8Url.reportValidity()) {
      m3u8Url.reportValidity();
      return;
    }

    const targetUrl = m3u8Url.value;
    const targetName = playlistName.value || "My IPTV Playlist";

    loadChannelsFromUrl(targetUrl, targetName);
  };

  const loadChannelsFromUrl = async (targetUrl: string, targetName: string) => {
    setPlaylist("url", targetUrl);
    setPlaylist("name", targetName);
    setIsLoading(true);

    try {
      const extractedChannels = await fetchAndParseM3U(targetUrl);

      setPlaylist("channels", extractedChannels);
    } catch (error: any) {
      console.error(error.message);
      removePlaylist(); 
      setErrorMessage("Unable to load the playlist.");
    } finally {
      setIsLoading(false);
    }
  };

  const numberOfChannels = () => playlist.channels.length;

  onMount(() => {
    if (playlist.url) {
      loadChannelsFromUrl(playlist.url, playlist.name);
    }
  });

  createEffect(() => {
    if (playlist.url) {
      localStorage.setItem('iptv_playlist_url', playlist.url);
      localStorage.setItem('iptv_playlist_name', playlist.name);
    } else {
      localStorage.removeItem('iptv_playlist_url');
      localStorage.removeItem('iptv_playlist_name');
    }
  });

  return (
    <>
      <main class={styles.loadPlaylistContainer}>
        <Header backButton={true} backText="LOAD IPTV PLAYLIST" backPage="/"/>
        <div class={styles.contentRow}>
          <section class={styles.formContainer}>
            <Input
              label='M3U/M3U8 URL:'
              placeholder='https://example.com/playlist.m3u8'
              id='url'
              type='url'
              ref={m3u8Url}
              required
              disabled={!!playlist.url}
            />
            <Input
              label='Playlist name (optional):'
              placeholder='My IPTV Playlist'
              id='name'
              type='text'
              ref={playlistName}
              disabled={!!playlist.name}
              maxlength="40"
            />
            <div class={styles.actionBtns}>
              <Show when={playlist.url}>
                <Button type='button' secondary onClick={removePlaylist} btnText="Remove Playlist" />
                <Button type='button' onClick={goSelectStream} btnText="Select Stream" />
              </Show>
              <Show when={!playlist.url}>
                <Button type='button' onClick={handlePlaylist} btnText="Save & Load Playlist" />
              </Show>
            </div>
          </section>
          <section class={styles.statusContainer}>
            <Show when={isLoading()}>
              <h1>Loading playlist...</h1>
            </Show>
            <Show when={!isLoading() && playlist.channels.length > 0}>
              <h1>Playlist loaded!</h1>
              <strong>{playlist.name}</strong>
              <p>{numberOfChannels()} channels loaded.</p>
            </Show>
            <Show when={!isLoading() && errorMessage()}>
              <h1>Error loading this playlist!</h1>
            </Show>
          </section>
        </div>
      </main>
    </>
  );
};

export default LoadPlaylist;
