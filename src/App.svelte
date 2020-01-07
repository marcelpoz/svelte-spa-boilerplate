<h1>
  Hello my name is
  <span class="{$store.name ? 'name' : ''}">{$store.name ? $store.name : 'undefined'}</span>
  and I am
  <span class="{$store.age ? 'age' : ''}">{$store.age}</span>
  years old.
</h1>

<textarea bind:value="{html}"></textarea>
<button on:click="{handlePublishHtml}">Publish</button>

<div class="html-preview">
  <small class="html-preview__title">HTML Preview</small>

  <div class="html-preview__content">
    {#if html}
      {@html html}
    {:else}
      <span class="error">No html entered</span>
    {/if}
  </div>
</div>

<div class="html-published">
  {#each publishedHtml as html, i (html.id)}
    <div>
      <h2>#{i}</h2>
      <small>{html.id}</small>
      <div>
        {@html html.content}
      </div>
    </div>
  {/each}
</div>

<!-- <Form
  on:update-name="{e => ($store.name = e.detail)}"
  on:update-age="{e => ($store.age = e.detail)}"
  {$store.name}
  {$store.age}
/> -->

<Form />

<script>
  import { createEventDispatcher, onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';
  import uuid from 'uuid/v4';

  import Form from '@/components/Form';
  import store from '@/store/index';

  let html = 'This is <strong>strong</strong> html boi!';
  let publishedHtml = [];

  // Watcher variable
  // $: bigName = name ? name.toUpperCase() : 'Name unknown';

  const handlePublishHtml = () => {
    publishedHtml = [{ id: uuid(), content: html }, ...publishedHtml];
    html = '';
  };

  beforeUpdate(() => {
    console.log('before update');
  });

  afterUpdate(() => {
    console.log('after update');
  })

  onMount(() => {
    console.log('mounted');
  });

  onDestroy(() => {
    console.log('destroyed');
  });
</script>

<style src="./App.scss" lang="scss">

</style>
