<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
    gap?: string
  }

  let { children, gap = '16px' }: Props = $props()
</script>

<div class="container" style:--container-gap={gap}>
  {@render children()}
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: var(--container-gap);
    width: 100%;
    min-width: 0;
  }
</style>
