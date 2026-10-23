<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props()
</script>

<section class="login-card" aria-labelledby="login-title">
  {@render children()}
</section>

<style>
  .login-card {
    width: 100%;
    max-width: 420px;
    padding: 36px;
    border: 1px solid var(--color-border);
    border-radius: 5px;
    background: var(--color-surface);
    box-shadow: 0 24px 80px rgb(0 0 0 / 30%);
  }

  @media (max-width: 480px) {
    .login-card {
      padding: 26px 22px;
    }
  }
</style>
