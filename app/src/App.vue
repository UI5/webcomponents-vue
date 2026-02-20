<script setup lang="ts">
	import { ref, onMounted } from "vue";
	import createComponent from "@ui5/webcomponents-vue";

	// web components
	import Avatar_ from "@ui5/webcomponents/dist/Avatar.js";
	import Bar_ from "@ui5/webcomponents/dist/Bar.js";
	import Button_ from "@ui5/webcomponents/dist/Button.js";
	import Dialog_ from "@ui5/webcomponents/dist/Dialog.js";
	import Input_ from "@ui5/webcomponents/dist/Input.js";
	import MessageStrip_ from "@ui5/webcomponents/dist/MessageStrip.js";
	import Title_ from "@ui5/webcomponents/dist/Title.js";
	import DatePicker_ from "@ui5/webcomponents/dist/DatePicker.js";
	import { Ui5DatePicker } from "@ui5/webcomponents-vue/components";

	// wrappers
	const Avatar = createComponent(Avatar_);
	const Bar = createComponent(Bar_);
	const Button = createComponent(Button_);
	const Dialog = createComponent(Dialog_);
	const DatePicker = createComponent(DatePicker_, { prop: "value", event: "change" });
	const DialogWithVModel = createComponent(Dialog_, { prop: "open", event: "close" });
	const Input = createComponent(Input_);
	const MessageStrip = createComponent(MessageStrip_);
	const Title = createComponent(Title_);

	const dialogRef = ref();
	const inpValue = ref("");
	const dateValue = ref("1995-03-31");
	const isDialogOpen1 = ref(false);
	const isDialogOpen2 = ref(false);

	onMounted(() => {
		console.log("dialogRef.value : ", dialogRef.value);
	});

	const onInput = (event: Event) => {
		inpValue.value = (event.target as HTMLInputElement).value;
	};
</script>
  
<template>
		<div class="container">
			<br><br>
			<Bar>
				<template #startContent>
					<Button design="Emphasized">Start</Button>
				</template>
				<template #endContent>
					<Avatar initials="FX" size="XS" interactive/>
				</template>
				<MessageStrip>Bar Default Content</MessageStrip>
			</Bar>
			<br><br>
			
			<!-- <ui5-input v-model="inpValue" placeholder="Start typing..."></ui5-input> -->
			<Input v-model="inpValue" placeholder="Start typing..." />
			<!-- <ui5-input :value="inpValue" @input="onInput" placeholder="Start typing..."> -->
			<Input :value="inpValue" @input="onInput" placeholder="Start typing..."/>

			<Ui5DatePicker v-model="dateValue" valueFormat="YYYY-m-d" />
			<DatePicker v-model="dateValue" valueFormat="YYYY-m-d" />
			<br><br>

			<!-- One-way binding "open" prop + "close" event -->
			<Dialog ref="dialogRef" :open="isDialogOpen1" @close="isDialogOpen1 = false" headerText="Dialog Title">
				<MessageStrip @close="isDialogOpen1 = false">Dialog Content</MessageStrip>
				<template #footer>
					<Title>Dialog footer</Title>
				</template>
			</Dialog>

			<Button @click="isDialogOpen1 = true" design="Attention">Open Dialog 1</Button>


			<!-- Two-way binding via v-model on Dialog (v-model binds to "open" and listens for "close") -->
			<DialogWithVModel v-model="isDialogOpen2" headerText="Dialog Title">
				<MessageStrip @close="isDialogOpen2 = false">Dialog Content</MessageStrip>
				<template #footer>
					<Title>Dialog footer</Title>
				</template>
			</DialogWithVModel>

			<Button @click="isDialogOpen2 = true" design="Negative">Open Dialog 2</Button>

			<pre>Model : { value: {{ inpValue || `""`}}; isDialogOpen1: {{ isDialogOpen1 }};  isDialogOpen2: {{ isDialogOpen2 }}; dateValue: {{ dateValue }}}</pre>
		</div>
</template>
