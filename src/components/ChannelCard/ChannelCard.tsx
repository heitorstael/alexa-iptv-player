import styles from './ChannelCard.module.scss';

import type { IptvChannel } from '../../types/playlist';

const ChannelCard = (props: IptvChannel) => {
  return (
    <>
      <article class={styles.channelContainer}>
        <div class={styles.logoContainer}>
          <img 
            src={props.logo || "/images/channel-logo-placeholder.svg"}
            alt={`${props.name} logo`}
            class={styles.channelLogo}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/images/channel-logo-placeholder.svg";
            }}
          />
        </div>
        <h2>{props.name}</h2>
        <span>{props.group}</span>
      </article>
    </>
  );
};

export default ChannelCard;
