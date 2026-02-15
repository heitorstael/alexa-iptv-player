import type { Component } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import styles from './Home.module.scss';

import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import qrCodePlaylist from '../../assets/iptv-playlist-qrcode.png';

const Home: Component = () => {
  const navigate = useNavigate();
  const goLoadPlaylist = () => { navigate("/load-playlist"); }

  return (
    <>
      <main class={styles.homeContainer}>
        <Header backButton={false} />
        <div class={styles.contentRow}>
          <section class={styles.tutorialContainer}>
            <p>A simple and easy-to-use Web IPTV Player to your Alexa Echo Show.</p>
            <p>To get started, you will need to have a M3U URL to load TV channel streams. We don't provide any TV channel streams - our site is just the player. You need to subscribe to a legitimate IPTV service that will give you an M3U/M3U8 link.</p>
            <p>Scan the QR Code on the right to get a suggestion on a free legal playlist.</p>
            <Button onClick={goLoadPlaylist} btnText="I already have the M3U URL" />
          </section>
          <section class={styles.qrCodeContainer}>
            <div ></div>
            <img src={qrCodePlaylist} alt="QR Code to IPTV Playlist" class={styles.qrCode} />
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
