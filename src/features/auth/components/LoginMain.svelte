<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props()
</script>

<main class="login-page">
  {@render children()}
</main>

<style>
  .login-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 24px;
    background: radial-gradient(ellipse at 50% 0%, #1e1b4b 0%, transparent 55%), var(--color-background);
  }

  @media (max-width: 480px) {
    .login-page {
      padding: 16px;
    }
  }
</style>
