import { ref, onMounted } from 'vue'

export function useNavBar() {
	const navBarH = ref(0)

	onMounted(() => {
		const info = uni.getSystemInfoSync()
		navBarH.value = (info.statusBarHeight || 20) + 44
	})
	return { navBarH }
}
