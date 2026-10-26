<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
    size?: number
  }

  let { children, size = 12 }: Props = $props()

  const span = $derived(Math.min(12, Math.max(1, Math.trunc(size))))
</script>

<div class="item" style:grid-column="span {span}">
  {@render children()}
</div>

<style>
  .item {
    min-width: 0;
  }
</style>
