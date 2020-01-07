<input type="text" value="{$store.name}" on:input="{handleNameChange}" />

<button on:click="{handleBabyMe}">Baby me</button>
<button on:click="{handleAgeMe}">Age me</button>

<script>
import store from '@/store/index';
// import { createEventDispatcher } from 'svelte';

// const dispatch = createEventDispatcher();

// export let name = ''; // optional prop
// export let age; // required prop

const handleNameChange = e => {
  // name = e.target.value;
  // dispatch('update-name', name);
  store.update(store => {
    store.name = e.target.value;
    return store;
  });
}

const handleBabyMe = () => {
  // age.set -= 1;
  // dispatch('update-age', age);
  store.update(store => {
    store.age = store.age - 1;
    return store;
  });
};

const handleAgeMe = () => {
  // age.set += 1;
  // dispatch('update-age', age);
  store.update(store => {
    store.age = store.age += 1;
    return store;
  });
};
</script>
