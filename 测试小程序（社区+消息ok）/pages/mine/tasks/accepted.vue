<template>
	<task-list type="accepted"></task-list>
</template>

<script>
import TaskList from './task-list.vue'

export default {
	name: 'AcceptedTasks',
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