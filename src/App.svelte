<h1>
  Hello my name is
  <span class="name">{data.name}</span>
  and I am
  <span class="age">{data.age}</span>
  years old.
</h1>

<button on:click="{handleBabyMe}">Baby me</button>
<button on:click="{handleAgeMe}">Age me</button>

<script>
  const data = {
    name: 'Marcel',
    age: 29,
  };

  const handleBabyMe = () => {
    data.age -= 1;
  };

  const handleAgeMe = () => {
    data.age += 1;
  };
</script>

<style src="./App.scss" lang="scss"></style>
