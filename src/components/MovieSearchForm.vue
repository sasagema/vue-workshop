<template>
    <div>
        

        <select name="type" @change="handleTypeChange" :value="selectedType">
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
        </select>
        <input type="text" name="title" v-model="title" placeholder="Title">
        <input type="number" name="year" v-model="year" placeholder="Year" min="1874" max="2020" minlength="4" maxlength="4" />
        <button @click="search" :disabled="isTitleEmpty">Search</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            selectedType: 'movie',
            year: ''
        }
    },
    methods: {
        handleTypeChange(event) {
            this.selectedType = event.target.value
        },
        search() {
            this.$emit('search', {
                title: this.title,
                type: this.selectedType,
                year: this.year
            })
        }
    },
    computed: {
        isTitleEmpty() {
            //return this.title.length === 0;
            return false;
        }
    },
}
</script>
