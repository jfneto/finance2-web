<script lang="ts">
  import type { Snippet } from 'svelte'

  type Alignment = 'auto' | 'left' | 'center' | 'right' | 'justify' | 'baseline'

  interface Props {
    children: Snippet
    size?: number
    align?: Alignment
  }

  let { children, size = 12, align = 'auto' }: Props = $props()

  const getAlignment = (align: Alignment) => {
    switch (align) {
      case 'left':
        return 'start'
      case 'center':
        return 'center'
      case 'right':
        return 'end'
      case 'justify':
        return 'stretch'
      case 'auto':
        return 'auto'
    }
  }

  const span = $derived(Math.min(12, Math.max(1, Math.trunc(size))))
  const justifySelf = $derived(getAlignment(align))
</script>

<div class="item" style:grid-column="span {span}" style:justify-self={justifySelf} style:text-align={align}>
  {@render children()}
</div>

<style>
  .item {
    min-width: 0;
  }
</style>
