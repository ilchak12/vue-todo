<template>
	<v-dialog
		transition="dialog-bottom-transition"
		persistent
		width="600"
	>
		<v-card>
			<v-toolbar
				color="primary"
				title="Confirm your action"
			></v-toolbar>
			<v-card-text>
				{{ message || "Are you sure you want to delete?" }}
			</v-card-text>
			<v-card-actions class="justify-end modal__bottom">
				<v-btn
					variant="flat"
					color="red"
					prepend-icon="mdi-cancel"
					@click="cancelAction"
				>
					No
				</v-btn>
				<v-btn
					variant="flat"
					color="green"
					prepend-icon="mdi-check-circle"
					@click="confirmAction"
				>
					Yes
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
const props = defineProps([
	"confirmAction",
	"cancelAction",
	"message"
])
</script>

<style scoped lang="scss">

</style>
