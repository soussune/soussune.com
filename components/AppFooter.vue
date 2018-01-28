<template>
  <footer role="contentinfo" class="footer">
    <header class="header">
      <h2 class="title">ご意見、ご感想</h2>
      <div class="desc">お気軽にコメントをお寄せください</div>
    </header>

    <div class="feedback">
      <div class="links">
        <FeedbackTweet
          :url="href"
          class="button"
        ><icon name="twitter" scale="1.1"></icon> リンクをツイート</FeedbackTweet>
        <FeedbackForm
          :entryTitle="href"
          class="button"
        ><icon name="pencil-square-o" scale="1.1"></icon>お便りを送る</FeedbackForm>
      </div>
      <div class="timeline">
        <TwitterTimeline
          :widgetId="'956788689086046208'"
          :q="'#soussune'"
          :rt="false"
        />
      </div>
    </div>
  </footer>
</template>

<script>
import TwitterTimeline from '~/components/TwitterTimeline.vue'
import FeedbackForm from '~/components/FeedbackForm.vue'
import FeedbackTweet from '~/components/FeedbackTweet.vue'

export default {
  components: {
    FeedbackTweet,
    FeedbackForm,
    TwitterTimeline
  },
  computed: {
    tweetUrl() {
      return location.href
    }
  },
  data() {
    return {
      href: ''
    }
  },
  methods: {
    updateHref() {
      this.href = location.href
    }
  },
  mounted() {
    this.updateHref()
  },
  watch: {
    $route: function() {
      this.updateHref()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/mixin/_mediaquery.scss';
@import '~assets/css/_vars.scss';

.footer {
  padding: 1rem 1rem 5rem;
  color: $clr-white;

  display: grid;
  justify-items: center;
  grid-gap: 20px;

  background: $clr-white-d;
  color: $clr-black;

  .header {
    text-align: center;
    .title {
      color: $clr-black-dd;
    }
    .desc {
      color: $clr-black;
    }
  }
}
.feedback {
  display: grid;
  grid-template-columns: minmax(100px, 540px) auto;
  grid-gap: 20px;
  grid-row-gap: 40px;
  align-items: start;

  @include mq() {
    grid-template-columns: auto;
    margin: 0 1rem;
    .timeline {
      order: 3 !important;
    }
  }
  .links {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    order: 2;
  }
  .timeline {
    order: 1;
  }

  .button {
    @import '~assets/css/_roundButton.scss';
  }
}
</style>
