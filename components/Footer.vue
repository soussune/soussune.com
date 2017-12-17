<template>
  <footer role="contentinfo" class="footer">
    <section>
      <h2>soussune とは</h2>
      <p>soussune は、ポッドキャストを通じて他人と意見を揉んでいきたいエンジニアの集いです。</p>
      <ul class="footer__links">
        <li>
          <nuxt-link to="/actors">人物一覧</nuxt-link>
        </li>
        <li>
          <a href="https://medium.com/soussune">開発ブログ</a>
        </li>
      </ul>
    </section>
    <section>
      <h2>#soussune</h2>
      <p>soussune への感想や質問などは、Twitterでハッシュタグ <a href="https://twitter.com/search?q=%23soussune" target="_blank">#soussune</a>  をご利用ください。</p>
      <div class="footer-twitter">
        <a href="https://twitter.com/soussunefm" class="twitter-follow-button" data-show-count="false" data-lang="en" data-size="large">Follow @soussunefm</a>
      </div>
    </section>
    <section>
      <h2>購読</h2>
      <p>新しいエピソードの配信を購読できます。</p>
      <ul class="footer__links">
        <li>
          <a href="https://itunes.apple.com/jp/podcast/soussune/id1247135079" target="_blank">iTunesで購読</a>
        </li>
        <li>
          <a href="https://subscribeonandroid.com/soussune.com/feed.xml" target="_blank">Androidで購読</a>
        </li>
        <li>
          <a href="https://push.dog/subscribe?url=https://soussune.com" target="_blank">Pushdogで購読</a>
        </li>
        <li>
          <a href="/feed.xml" target="_blank">RSSで購読</a>
        </li>
      </ul>
    </section>
    <hr>
    <p class="footer__copyright">&copy; soussune 2017</p>
  </footer>
</template>
