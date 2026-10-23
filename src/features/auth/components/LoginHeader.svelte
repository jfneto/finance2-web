<script lang="ts">
  import { _ } from 'svelte-i18n'
</script>

<header class="login-header">
  <h1 id="login-title">{$_('auth.login.title')}</h1>
  <p>{$_('auth.login.subtitle')}</p>
</header>

<style>
  .login-header {
    margin-bottom: 28px;
  }

  .login-header h1 {
    margin: 0 0 8px;
    font-size: clamp(24px, 5vw, 28px);
    letter-spacing: -0.8px;
  }

  .login-header p {
    color: #a1a1aa;
    font-size: 14px;
    line-height: 1.6;
  }

  .login-header p {
    margin: 0;
  }
</style>
