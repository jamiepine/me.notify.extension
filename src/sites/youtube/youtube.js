/* eslint-disable */
'use strict';

(function() {
  let channelID = () => {
    var channelName = '';

    const watchPage = document.querySelector(`#owner-name a`);
    if (watchPage !== '') {
      channelName = watchPage.href;
      var len = channelName.length;
      channelName = channelName.substr(len - 24, len);
    }

    return channelName;
  };

  let bellButton = null;
  const watchPage = ({ type }) => {
    if (type === 'yt-navigate-finish') document.body.setAttribute('data-notified', 'false');
    if (document.body.getAttribute('data-notified') === 'true') return; // Don't embed if it's already on the page

    const videoMeta = document.querySelector(`#meta ytd-video-secondary-info-renderer .ytd-video-secondary-info-renderer`);
    if (!videoMeta) return;
    const subscribeButtonSection = videoMeta.querySelector(`#meta-contents #subscribe-button`);
    if (!subscribeButtonSection) return;

    document.querySelector(`#subscribe-button.ytd-video-secondary-info-renderer`).style.flexDirection = 'row';

    bellButton = document.createElement('paper-button');
    bellButton.classList = 'style-scope ytd-button-renderer style-default';
    bellButton.id = 'notify-bell';
    bellButton.setAttribute('elevation', '0');
    bellButton.setAttribute('aria-disabled', 'false');
    bellButton.setAttribute('tabindex', '0');
    bellButton.setAttribute('role', 'button');
    bellButton.innerText = `Notify.me`;
    bellButton.style = 'color: #B4DA55; border: 1px solid #B4DA55; width: 75px; border-radius: 3px; margin: 7px;';

    bellButton.onclick = function() {
      alert(channelID());
    };

    console.log({ bellButton, subscribeButtonSection, videoMeta, child: subscribeButtonSection.childNodes[0] });
    subscribeButtonSection.insertBefore(bellButton, subscribeButtonSection.childNodes[0]);
    document.body.setAttribute('data-notified', 'true'); // Tell the page it's already embedded so it doesn't embed again
  };

  const embeded = evt => {
    if (window.location.pathname === '/watch') watchPage(evt);
  };

  const clean = ({ type }) => {
    if (bellButton != null) bellButton.remove();
    document.body.setAttribute('data-notified', 'false');
  };

  document.addEventListener('yt-navigate-finish', clean);
  document.addEventListener('yt-navigate-start', clean);
  document.addEventListener('yt-page-data-updated', embeded);
  // document.addEventListener('yt-visibility-refresh', embeded);
})();
