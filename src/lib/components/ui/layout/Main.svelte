<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
    mainClass: string
  }

  let { children, mainClass }: Props = $props()
</script>

<main class={mainClass}>
  {@render children()}
</main>
