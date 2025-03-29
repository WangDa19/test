<template>
	<task-list type="completed"></task-list>
</template>

<script>
import TaskList from './task-list.vue'

export default {
	name: 'CompletedTasks',
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