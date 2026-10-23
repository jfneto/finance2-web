<script lang="ts">
  type Props = {
    title: string
    name: string
    content: string
  }

  let { title, name, content }: Props = $props()
</script>

<svelte:head>
  <title>{title}</title>
  <meta {name} {content}>
</svelte:head>
