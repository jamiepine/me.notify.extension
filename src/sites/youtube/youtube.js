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

  const watchPage = () => {
    const videoMeta = document.getElementById(`meta`);
    const subscribeButtonSection = videoMeta.parentNode.querySelector(`#meta-contents #subscribe-button`);
    const subscribeButton = subscribeButtonSection.childNodes[0];

    document.querySelector(`#subscribe-button.ytd-video-secondary-info-renderer`).style.flexDirection = 'row';

    const bellButton = document.createElement('paper-button');
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

    subscribeButtonSection.insertBefore(bellButton, subscribeButton);
  };

  const embeded = () => {
    if (window.location.pathname === '/watch') watchPage();
  };

  embeded();
  document.addEventListener('yt-navigate-finish', embeded);
})();
