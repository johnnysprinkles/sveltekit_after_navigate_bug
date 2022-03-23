<script context=module>
  import { api } from './_api';

  export async function load({ params, session }) {
    let { uid } = params;
    let { userid } = session;

    // api.svelte.dev might not have a single item lookup API, so fetch them all
    // and filter in memory.
    let response = await api('get', `todos/${userid}`);
    let all_items = await response.json();

    let i = all_items.findIndex(x => x.uid == uid);

    if (i == -1) {
      return {
        status: 404
      };
    }

    return {
      props: {
        item: {
          ...all_items[i],
          prev_uid: all_items[i - 1]?.uid,
          next_uid: all_items[i + 1]?.uid
        }
      }
    };
  }
</script>

<script>
  export let item;
</script>

<h1>
  {#if item.prev_uid}
    <a class="arrow" href="/todos/{item.prev_uid}">◀</a>
  {:else}
    <span class="arrow">◀</span>
  {/if}
  {item.text}
  {#if item.next_uid}
    <a class="arrow" href="/todos/{item.next_uid}">▶</a>
  {:else}
    <span class="arrow">▶</span>
  {/if}
</h1>
<h2>Status: {item.done ? 'Done' : 'Not done'}</h2>

<style>
  .arrow {
    margin: 0px 20px;
  }
  .arrow:hover {
    text-decoration: none;
  }
  span.arrow {
    color: var(--primary-color);
  }
</style>
