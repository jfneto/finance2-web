<script lang="ts">
  import { routes } from '@app/router'
  import { Router } from '@mateothegreat/svelte5-router'
  import { authGuard } from './app/guards'
</script>

<Router
  {routes}
  hooks={{
    pre: authGuard,
  }}
/>
