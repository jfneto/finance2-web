<script lang="ts">
  interface Props {
    text: string
  }

  let { text }: Props = $props()
</script>

<div class="brand">
  <div class="brand-icon" aria-hidden="true">F</div>
  <span>{text}</span>
</div>

<style>
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 36px;
    font-size: 18px;
    font-weight: 650;
    letter-spacing: -0.4px;
  }

  .brand-icon {
    display: grid;
    width: 36px;
    height: 36px;
    place-items: center;
    border-radius: 10px;
    background: #6366f1;
    color: white;
    font-weight: 700;
  }
</style>
