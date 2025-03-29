<template>
	<view class="icon-button" @tap="handleClick">
		<image :src="icon" class="icon" mode="aspectFit"/>
		<text class="label">{{ label }}</text>
	</view>
</template>

<script>
export default {
	props: {
		icon: {
			type: String,
			required: true
		},
		label: {
			type: String,
			required: true
		}
	},
	methods: {
		handleClick() {
			this.$emit('click');
		}
	}
}
</script>

<style>
.icon-button {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 25%;
}

.icon {
	width: 90rpx;
	height: 90rpx;
	margin-bottom: 10rpx;
}

.label {
	font-size: 24rpx;
	color: #333;
}
</style> 