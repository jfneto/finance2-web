<script lang="ts">
  import { authSession } from '@lib/auth/session.svelte'
</script>

<nav class="navbar">
  <div class="user-info">
    <span class="user-email">{authSession.user?.email ?? ''}</span>
  </div>
</nav>

<style>
  .navbar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 64px;
    padding: 0 24px;
    box-sizing: border-box;
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-surface);
    box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
    position: relative;
    z-index: 1;
    margin-bottom: 10px;
  }

  .user-info {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  .user-email {
    overflow: hidden;
    color: var(--foreground);
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
