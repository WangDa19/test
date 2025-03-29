<template>
	<task-list type="published"></task-list>
</template>

<script>
import TaskList from './task-list.vue'

export default {
	name: 'PublishedTasks',
	components: {
		TaskList
	}
}
</script>

<style>
page {
	background: #f8f8f8;
}
</style> 