import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FB_ID } from '../../constants';

export default class SocialShare extends Component {
  static propTypes = {
    provider: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    feed: PropTypes.bool,
    url: PropTypes.string,
    text: PropTypes.string,
    mediaUrl: PropTypes.string,
    hashtags: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    id: null,
    feed: false,
    url: null,
    text: null,
    mediaUrl: null,
    hashtags: null,
  };

  constructor(props) {
    super(props);

    const { provider, id, url, text, feed, mediaUrl, hashtags } = props;
    let urlString = '';

    if (provider === 'facebook') {
      urlString += `https://www.facebook.com/dialog/${feed ? 'feed' : 'share'}?&display=${encodeURIComponent('popup')}`;

      if (id) {
        urlString += `&app_id=${id}`;
      }
      if (url) {
        urlString += `&href=${encodeURIComponent(url)}`;
      }
      if (id) {
        urlString += `&app_id=${encodeURIComponent(id)}`;
      } else if (FB_ID) {
        urlString += `&app_id=${encodeURIComponent(FB_ID)}`;
      }
      if (text) {
        urlString += `&quote=${encodeURIComponent(text)}`;
      }
      if (hashtags) {
        urlString += `&hashtag=${encodeURIComponent(hashtags)}`;
      }
      if (mediaUrl) {
        urlString += `&source=${encodeURIComponent(mediaUrl)}`;
      }
    } else if (provider === 'twitter') {
      urlString += 'https://www.twitter.com/intent/tweet?';
      if (url) {
        urlString += `&url=${encodeURIComponent(url)}`;
      }
      if (id) {
        urlString += `&via=${encodeURIComponent(id)}`;
      }
      if (text) {
        urlString += `&text=${encodeURIComponent(text)}`;
      }
      if (hashtags) {
        urlString += `&hashtags=${encodeURIComponent(hashtags)}`;
      }
    }

    this.state = {
      urlString,
    };
  }

  openDialog = () => {
    window.open(
      this.state.urlString,
      this.props.provider,
      `toolbar=0,status=0,resizable=yes,width=600,height=500,top=${(window.innerHeight - 500) /
        2},left=${(window.innerWidth - 600) / 2}`,
    );
  };

  render() {
    return <span onClick={this.openDialog}>{this.props.children}</span>;
  }
}
