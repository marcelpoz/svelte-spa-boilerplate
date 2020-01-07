import { writable } from 'svelte/store';

const store = writable({
  name: 'Marcel',
  age: 29,
});

export const name = writable('Marcel');
export const age = writable(29);

export default store;
