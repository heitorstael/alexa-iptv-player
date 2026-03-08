import type { Component } from 'solid-js';
import { For } from 'solid-js';
import { useNavigate, A } from "@solidjs/router";
import { createVirtualizer } from "@tanstack/solid-virtual";
import styles from './SelectStream.module.scss';

import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import ChannelCard from '../../components/ChannelCard/ChannelCard';
import { usePlaylist } from '../../context/Playlist';

const SelectStream: Component = () => {
  let parentRef!: HTMLDivElement;
  // const navigate = useNavigate();
  // const goLoadStream = () => { navigate("/load-stream"); }

  const { playlist } = usePlaylist();

  const virtualizer = createVirtualizer({
    count: playlist.channels.length,
    getScrollElement: () => parentRef,
    estimateSize: () => 270,
    horizontal: true,
    overscan: 3,
  });

  return (
    <>
      <main class={styles.selectStreamContainer}>
        <Header backButton={true} backText="SELECT STREAM" backPage="/load-playlist" subText={playlist.name} />
        <div class={styles.contentRow}>
          <section class={styles.filterContainer}>
            <span>filter</span>
          </section>
          <section
            ref={parentRef}
            class={styles.channelsContainer}
          >
            <div
              class={styles.innerVirtualContainer}
              style={{
                width: `${virtualizer.getTotalSize()}px`,
              }}
            >
              <For each={virtualizer.getVirtualItems()}>
                {(virtualItem) => {
                  const channel = playlist.channels[virtualItem.index];

                  return (
                    <div
                      class={styles.virtualItemWrapper}
                      style={{
                        transform: `translateX(${virtualItem.start}px)`,
                        width: `${virtualItem.size}px`
                      }}
                    >
                      <A href='#' style="text-decoration: none;">
                        <ChannelCard {...channel} />
                      </A>
                    </div>
                  );
                }}
              </For>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default SelectStream;
